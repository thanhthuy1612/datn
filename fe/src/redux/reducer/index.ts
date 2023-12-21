import { MetaMaskInpageProvider } from "@metamask/providers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { checkAccount } from "../../api/account";
import { DateFormatType, IAccount, ICart } from "../../interfaces/IRouter";
import { login } from "../../api/login";
import { addressContract } from "../../ultis/addressContract";
import { abi } from "../../ultis/abi";
import { dateFormat } from "../../ultis";
import { getItemIPFS, uploadToIPFS } from "../../api/uploadPicture";
import { getCartsByAccount } from "../../api/cart";

const initialState: IStateRedux = {
  account: undefined,
  loading: false,
  upComing: [],
  past: [],
  myNFT: [],
  myNew: [],
  myDelete: [],
  mySeller: [],
  myDate: [],
  itemsSeller: [],
  shipNFT: [],
  myShip: [],
  cart: [],
  loadingUpComing: false,
  loadingPast: false,
  loadingHot: false,
  loadingCreate: false,
  accountSearch: undefined,
  totalCart: null,
  loadingCart: false,
};

export interface IStateRedux {
  accountSearch?: IAccount;
  account?: IAccount;
  loading?: boolean;
  upComing?: any[];
  past?: any[];
  myNFT: any[];
  myNew: any[];
  myDelete: any[];
  mySeller: any[];
  myDate: any[];
  itemsSeller: any[];
  shipNFT: any[];
  myShip: any[];
  cart: any[];
  loadingUpComing?: boolean;
  loadingPast?: boolean;
  loadingCreate?: boolean;
  loadingHot?: boolean;
  totalCart?: number | null;
  loadingCart?: boolean;
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const getERC = async () => {
  const provider: any = window.ethereum;
  await provider.request({
    method: "eth_requestAccounts",
  });
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();
  const contract = new ethers.Contract(addressContract, abi, web3Provider);
  const erc721 = contract.connect(signer);
  const address = await signer.getAddress();
  return { contract, erc721, address };
};

export const changeTokenUri = createAsyncThunk(
  "updateToken",
  async (option: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingCreate(true));
      const { erc721, address } = await getERC();
      const url = await uploadToIPFS({
        img: `${option.file}`,
        date: Date.now(),
        create: address.toString(),
        status: 0,
        price: 0,
        description: option.description,
      });
      const transaction = await erc721.updateToken(
        option.tokenId,
        url as string,
        option.file,
        option.description
      );
      await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  }
);

export const shipMarketSale = createAsyncThunk(
  "shipMarketSale",
  async (option: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingCreate(true));
      const { erc721, address } = await getERC();
      const url = await uploadToIPFS({
        img: "",
        date: Date.now(),
        create: address.toString(),
        status: 2,
        price: 0,
      });
      const transaction = await erc721.shipMarketSale(
        option.tokenId,
        url as string
      );
      await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  }
);

export const doneShipMarketSale = createAsyncThunk(
  "doneShipMarketSale",
  async (option: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingCreate(true));
      const { erc721, address } = await getERC();
      const url = await uploadToIPFS({
        img: `${option.file}`,
        date: Date.now(),
        create: address.toString(),
        status: 3,
        price: 0,
        description: option.description,
      });
      const transaction = await erc721.doneShipMarketSale(
        option.tokenId,
        url as string
      );
      await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  }
);

export const createToken = createAsyncThunk(
  "createToken",
  async (option: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingCreate(true));
      const { contract, erc721, address } = await getERC();
      const url = await uploadToIPFS({
        img: `${option.file}`,
        date: Date.now(),
        create: address.toString(),
        status: 0,
        price: 0,
        description: option.description,
      });
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();
      const transaction = await erc721.createToken(
        url as string,
        option.name.toString(),
        option.file.toString(),
        option.description.toString(),
        {
          value: listingPrice,
        }
      );
      await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  }
);
export const resellToken = createAsyncThunk(
  "resellToken",
  async (item: any, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721, address } = await getERC();
    const url = await uploadToIPFS({
      img: "",
      date: Date.now(),
      create: address.toString(),
      status: 0,
      price: item.price,
      description: item.description,
    });
    const price = ethers.utils.parseUnits(item.price, "ether");
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    const result = await erc721.resellToken(
      item.tokenId,
      url as string,
      item.name,
      price,
      item.date,
      item.description,
      item.from,
      { value: listingPrice }
    );
    await result.wait();
  }
);

const getItems = async (data: any, contract: any) => {
  const items = await Promise.all(
    data.map(async (i: any) => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      const meta = tokenUri;
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
      const picture = await getItemIPFS(i.img);
      const imageObjectURL = URL.createObjectURL(picture);
      return {
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        shipper: i.shipper,
        number: i.status.toNumber(),
        price,
        sold: i.sold,
        expired: i.date.toNumber(),
        date: dateFormat(
          new Date(i.time.toNumber() * 1000),
          DateFormatType.FullDate
        ),
        title: i.name,
        img: imageObjectURL,
        list: meta,
        description: i.description,
        from: i.from,
        to: i.to
      };
    })
  );
  return items;
};

export const fetchMarketItem = createAsyncThunk(
  "fetchMarketItem",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMarketItems();
    const items = await getItems(data, contract);
    thunkAPI.dispatch(setLoading(false));
    return items;
  }
);

export const fetchItemsSeller = createAsyncThunk(
  "fetchItemsSeller",
  async (address: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchItemsSeller(address);
    const items = await getItems(data, contract);
    thunkAPI.dispatch(setLoading(false));
    return items;
  }
);

export const createMarketSale = createAsyncThunk(
  "createMarketSale",
  async (item: any, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { erc721, address } = await getERC();
    const url = await uploadToIPFS({
      img: "",
      date: Date.now(),
      create: address.toString(),
      status: 1,
      price: 0,
    });
    const result = await erc721.createMarketSale(
      item?.item.tokenId,
      url as string,
      item?.to
    );
    await result.wait();
  }
);

export const acceptMarketSale = createAsyncThunk(
  "acceptMarketSale",
  async (item: any, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { erc721, address } = await getERC();
    const url = await uploadToIPFS({
      date: Date.now(),
      create: address.toString(),
      status: 4,
      price: 0,
      img: `${item.file}`,
      description: item.description,
    });
    const price = ethers.utils.parseUnits(item?.item.price, "ether");
    const result = await erc721.acceptMarketSale(
      item?.item.tokenId,
      url as string,
      {
        value: price,
      }
    );
    await result.wait();
  }
);

export const deleteMarketSale = createAsyncThunk(
  "deleteMarketSale",
  async (item: any, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { erc721, address } = await getERC();
    const url = await uploadToIPFS({
      img: "",
      date: Date.now(),
      create: address.toString(),
      status: 5,
      price: 0,
      description: item.description,
    });
    const price = ethers.utils.parseUnits(item.price, "ether");
    const result = await erc721.deleteMarketSale(
      item.tokenId,
      url as string,
      item.description,
      {
        value: price,
      }
    );
    await result.wait();
  }
);

export const fetchMarketStartShip = createAsyncThunk(
  "fetchMarketStartShip",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoadingUpcoming(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMarketStartShip();
    const items = await getItems(data, contract);
    return items;
  }
);

export const fetchMarketItemsPast = createAsyncThunk(
  "fetchMarketItemsPast",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoadingPast(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMarketItemsAll();
    const items = await getItems(data, contract);
    return items;
  }
);

export const fetch = createAsyncThunk("fetch", async (_item, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  const { contract, erc721 } = await getERC();
  const dataMyNFT = await erc721.fetchMyNFTs();
  const itemsMyNFT = await getItems(dataMyNFT, contract);
  const dataList = await erc721.fetchItemsListed();
  const itemsList = await getItems(dataList, contract);
  const dataDate = await erc721.fetchItemsListedDate();
  const itemsDate = await getItems(dataDate, contract);
  const dataNew = await erc721.fetchItemsListedNew();
  const itemsNew = await getItems(dataNew, contract);
  const dataDelete = await erc721.fetchItemsListedDelete();
  const itemsDelete = await getItems(dataDelete, contract);
  return { itemsMyNFT, itemsList, itemsDate, itemsNew, itemsDelete };
});

export const fetchBuy = createAsyncThunk(
  "fetchBuy",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const dataMyNFT = await erc721.fetchMyNFTs();
    const itemsMyNFT = await getItems(dataMyNFT, contract);
    return { itemsMyNFT };
  }
);

export const fetchMarketMyShip = createAsyncThunk(
  "fetchMarketMyShip",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const dataMyNFT = await erc721.fetchMarketMyShip();
    const itemsMyNFT = await getItems(dataMyNFT, contract);
    return { itemsMyNFT };
  }
);

export const fetchMyNFTs = createAsyncThunk(
  "fetchMyNFTs",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMyNFTs();
    const items = await getItems(data, contract);
    return items;
  }
);

export const fetchItemsListedDelete = createAsyncThunk(
  "fetchItemsListedDelete",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchItemsListedDelete();
    const items = await getItems(data, contract);
    return items;
  }
);

export const fetchItemsListed = createAsyncThunk(
  "fetchItemsListed",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchItemsListed();
    const items = await getItems(data, contract);
    return items;
  }
);

export const fetchItemsListedDate = createAsyncThunk(
  "fetchItemsListedDate",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchItemsListedDate();
    const items = await getItems(data, contract);
    return items;
  }
);

export const fetchItemsListedNew = createAsyncThunk(
  "fetchItemsListedNew",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchItemsListedNew();
    const items = await getItems(data, contract);
    return items;
  }
);

export const getCartAccount = createAsyncThunk(
  "getCartAccount",
  async (account: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const { contract, erc721 } = await getERC();
    const listCarts = await getCartsByAccount(account);
    thunkAPI.dispatch(setTotalCart(!listCarts ? null : listCarts.length));
    if (!listCarts) {
      return [];
    }
    const result: any[] = await Promise.all(
      listCarts.map(async (item: ICart) => {
        const data = await erc721.fetchId(parseInt(item.url ?? ""));
        const res = await getItems(data, contract);
        return { ...res[0], ...item };
      })
    );
    return result;
  }
);

export const fetchConnect = createAsyncThunk(
  "connect",
  async (reload: boolean, thunkAPI) => {
    thunkAPI.dispatch(setLoadingCart(true));
    const reconnect = async (provider: any) => {
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      if (reload) {
        const address = await signer.getAddress();
        const result: IAccount = await checkAccount(address);
        thunkAPI.dispatch(setAccount(result));
        const listCarts = await getCartsByAccount(address);
        thunkAPI.dispatch(setTotalCart(!listCarts ? null : listCarts.length));
      } else {
        const state: any = thunkAPI.getState();
        if (state.item.wallet !== undefined) {
          const address = await signer.getAddress();
          const result = await checkAccount(address);
          thunkAPI.dispatch(setAccount(result));
          const listCarts = await getCartsByAccount(address);
          thunkAPI.dispatch(setTotalCart(!listCarts ? null : listCarts.length));
        } else {
          const sign = await signer.signMessage("Login");
          const result = await login(sign);
          thunkAPI.dispatch(setAccount(result));
          const listCarts = await getCartsByAccount(result?.wallet);
          thunkAPI.dispatch(setTotalCart(!listCarts ? null : listCarts.length));
        }
      }
    };
    try {
      const provider: MetaMaskInpageProvider | undefined = window.ethereum;
      if (provider) {
        await provider.request({
          method: "eth_requestAccounts",
        });
        provider.on("chainChanged", async function () {
          await reconnect(provider);
        });
        provider.on("accountsChanged", async function () {
          await reconnect(provider);
        });
        await reconnect(provider);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const item = createSlice({
  name: "item",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingUpcoming: (state, action) => {
      state.loadingUpComing = action.payload;
    },
    setLoadingPast: (state, action) => {
      state.loadingPast = action.payload;
    },
    setLoadingHot: (state, action) => {
      state.loadingHot = action.payload;
    },
    setAccountSearch: (state, action) => {
      state.accountSearch = action.payload;
    },
    setLoadingCreate: (state, action) => {
      state.loadingCreate = action.payload;
    },
    setTotalCart: (state, action) => {
      state.totalCart = action.payload;
    },
    setLoadingCart: (state, action) => {
      state.loadingCart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchConnect.fulfilled || fetchMarketItem.fulfilled,
      (state, _actions) => {
        state.loadingCart = false;
      }
    );
    builder.addCase(fetchMarketStartShip.fulfilled, (state, actions) => {
      state.loadingUpComing = false;
      state.shipNFT = actions.payload;
    });
    builder.addCase(fetchMarketItemsPast.fulfilled, (state, actions) => {
      state.loadingPast = false;
      state.past = actions.payload;
    });
    builder.addCase(fetch.fulfilled, (state, actions) => {
      state.loading = false;
      state.myDate = actions.payload.itemsDate;
      state.mySeller = actions.payload.itemsList;
      state.myNFT = actions.payload.itemsMyNFT;
      state.myNew = actions.payload.itemsNew;
      state.myDelete = actions.payload.itemsDelete;
    });
    builder.addCase(fetchBuy.fulfilled, (state, actions) => {
      state.loading = false;
      state.myNFT = actions.payload.itemsMyNFT;
    });
    builder.addCase(fetchMarketMyShip.fulfilled, (state, actions) => {
      state.loading = false;
      state.myShip = actions.payload.itemsMyNFT;
    });
    builder.addCase(fetchMyNFTs.fulfilled, (state, actions) => {
      state.loading = false;
      state.myNFT = actions.payload;
    });
    builder.addCase(fetchItemsListed.fulfilled, (state, actions) => {
      state.loading = false;
      state.mySeller = actions.payload;
    });
    builder.addCase(fetchItemsListedDate.fulfilled, (state, actions) => {
      state.loading = false;
      state.myDate = actions.payload;
    });
    builder.addCase(fetchItemsListedNew.fulfilled, (state, actions) => {
      state.loading = false;
      state.myNew = actions.payload;
    });
    builder.addCase(fetchItemsListedDelete.fulfilled, (state, actions) => {
      state.loading = false;
      state.myDelete = actions.payload;
    });
    builder.addCase(createMarketSale.fulfilled, (state, _actions) => {
      state.loading = false;
    });
    builder.addCase(acceptMarketSale.fulfilled, (state, _actions) => {
      state.loading = false;
    });
    builder.addCase(deleteMarketSale.fulfilled, (state, _actions) => {
      state.loading = false;
    });
    builder.addCase(createToken.fulfilled, (state, _actions) => {
      state.loadingCreate = false;
    });
    builder.addCase(changeTokenUri.fulfilled, (state, _actions) => {
      state.loadingCreate = false;
    });
    builder.addCase(shipMarketSale.fulfilled, (state, _actions) => {
      state.loadingCreate = false;
    });
    builder.addCase(doneShipMarketSale.fulfilled, (state, _actions) => {
      state.loadingCreate = false;
    });
    builder.addCase(resellToken.fulfilled, (state, _actions) => {
      state.loading = false;
    });
    builder.addCase(fetchItemsSeller.fulfilled, (state, actions) => {
      state.itemsSeller = actions.payload;
      state.loading = false;
    });
    builder.addCase(getCartAccount.fulfilled, (state, actions) => {
      state.cart = actions.payload;
      state.loading = false;
    });
  },
});
const reducer = item.reducer;

export const {
  setAccount,
  setLoading,
  setLoadingCreate,
  setLoadingPast,
  setLoadingUpcoming,
  setLoadingHot,
  setAccountSearch,
  setTotalCart,
  setLoadingCart,
} = item.actions;
export default reducer;

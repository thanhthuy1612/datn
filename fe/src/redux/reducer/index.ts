import { MetaMaskInpageProvider } from "@metamask/providers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { checkAccount } from "../../api/account";
import { DateFormatType, IAccount } from "../../interfaces/IRouter";
import { login } from "../../api/login";
import { addressContract } from "../../ultis/addressContract";
import { abi } from "../../ultis/abi";
import { dateFormat } from "../../ultis";
import { getItem, getItemIPFS, uploadToIPFS } from "../../api/uploadPicture";

const initialState: IStateRedux = {
  account: undefined,
  loading: false,
  upComing: [],
  past: [],
  myNFT: [],
  mySeller: [],
  myDate: [],
  itemsSeller: [],
  item: undefined,
  loadingUpComing: false,
  loadingPast: false,
  loadingHot: false,
  loadingCreate: false,
  accountSearch: undefined,
};

export interface IStateRedux {
  accountSearch?: IAccount;
  account?: IAccount;
  loading?: boolean;
  upComing?: any[];
  past?: any[];
  myNFT: any[];
  mySeller: any[];
  myDate: any[];
  itemsSeller: any[];
  item: any;
  loadingUpComing?: boolean;
  loadingPast?: boolean;
  loadingCreate?: boolean;
  loadingHot?: boolean;
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
  "changeTokenUri",
  async (option: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingCreate(true));
      const { erc721, address } = await getERC();
      const url = await uploadToIPFS({
        img: `${option.file}`,
        date: Date.now(),
        create: address.toString(),
      });
      const transaction = await erc721.changeTokenUri(
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
      });
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();
      const transaction = await erc721.createToken(
        url as string,
        option.name as string,
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
    const { contract, erc721 } = await getERC();
    const price = ethers.utils.parseUnits(item.price, "ether");
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();
    const result = await erc721.resellToken(
      item.tokenId,
      item.name,
      price,
      item.date,
      {
        value: listingPrice,
      }
    );
    await result.wait();
  }
);

const fetchMeta = async (params: string) => {
  return await Promise.all(
    params.split(";").map(async (item: string) => {
      const result = await getItem(item);
      const picture = await getItemIPFS(result.img);
      const imageObjectURL = await URL.createObjectURL(picture);
      return {
        ...result,
        img: imageObjectURL,
        date: dateFormat(new Date(result.date), DateFormatType.FullDate),
      };
    })
  );
};

const getItems = async (data: any, contract: any) => {
  const items = await Promise.all(
    data.map(async (i: any) => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      const meta = await fetchMeta(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
      return {
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        number: i.number.toNumber(),
        price,
        expired: dateFormat(
          new Date(i.date.toNumber()),
          DateFormatType.FullDate
        ),
        date: dateFormat(
          new Date(i.time.toNumber() * 1000),
          DateFormatType.FullDate
        ),
        title: i.name,
        img: meta[meta.length - 1].img,
        list: meta,
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
    const { erc721 } = await getERC();
    const price = ethers.utils.parseUnits(item.price, "ether");
    const result = await erc721.createMarketSale(item.tokenId, {
      value: price,
    });
    await result.wait();
  }
);

export const fetchMarketItemsUpComing = createAsyncThunk(
  "fetchMarketItemsUpComing",
  async (_item, thunkAPI) => {
    thunkAPI.dispatch(setLoadingUpcoming(true));
    const { contract, erc721 } = await getERC();
    const data = await erc721.fetchMarketItemsUpComing();
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
  return { itemsMyNFT, itemsList, itemsDate };
});

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

export const fetchConnect = createAsyncThunk(
  "connect",
  async (reload: boolean, thunkAPI) => {
    const reconnect = async (provider: any) => {
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      if (reload) {
        const address = await signer.getAddress();
        const result: IAccount = await checkAccount(address);
        thunkAPI.dispatch(setAccount(result));
      } else {
        const state: any = thunkAPI.getState();
        if (state.item.wallet !== undefined) {
          const address = await signer.getAddress();
          const result = await checkAccount(address);
          thunkAPI.dispatch(setAccount(result));
        } else {
          const sign = await signer.signMessage("Login");
          const result = await login(sign);
          thunkAPI.dispatch(setAccount(result));
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
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchConnect.fulfilled || fetchMarketItem.fulfilled,
      (_state, _actions) => {}
    );
    builder.addCase(fetchMarketItemsUpComing.fulfilled, (state, actions) => {
      state.loadingUpComing = false;
      state.upComing = actions.payload;
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
    builder.addCase(createMarketSale.fulfilled, (state, _actions) => {
      state.loading = false;
    });
    builder.addCase(createToken.fulfilled, (state, _actions) => {
      state.loadingCreate = false;
    });
    builder.addCase(changeTokenUri.fulfilled, (state, _actions) => {
      state.loadingCreate = false;
    });
    builder.addCase(resellToken.fulfilled, (state, _actions) => {
      state.loading = false;
    });
    builder.addCase(fetchItemsSeller.fulfilled, (state, actions) => {
      state.itemsSeller = actions.payload;
      state.loading = false;
    });
  },
});
const reducer = item.reducer;

export const {
  setAccount,
  setLoading,
  setItem,
  setLoadingCreate,
  setLoadingPast,
  setLoadingUpcoming,
  setLoadingHot,
  setAccountSearch,
} = item.actions;
export default reducer;

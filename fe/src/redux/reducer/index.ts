import { MetaMaskInpageProvider } from "@metamask/providers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { checkAccount } from "../../api/account";
import { IAccount } from "../../interfaces/IRouter";
import { login } from "../../api/login";
import { addressContract } from "../../ultis/addressContract";
import { abi } from "../../ultis/abi";
import { getItem } from "../../api/uploadPicture";

const initialState = {
  account: undefined,
  loading: false,
};

export interface IStateRedux {
  account?: IAccount | undefined;
  loading?: boolean;
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
  return { contract, erc721 };
};

export const createToken = createAsyncThunk(
  "createToken",
  async (option: any, thunkAPI) => {
    try {
      console.log(option);
      thunkAPI.dispatch(setLoading(true));
      const { contract, erc721 } = await getERC();
      console.log(erc721, option.img, contract);
      const price = ethers.utils.parseUnits(option.price, "ether");
      const transaction = await erc721.createToken(
        "123",
        price,
        option.number,
        "1",
        {
          value: "250000Gwei",
        }
      );
      await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  }
);

const getItems = async (data: any, contract: any) => {
  const items = await Promise.all(
    data.map(async (i: any) => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      const meta = await getItem(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
      return {
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        price,
        meta,
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchConnect.fulfilled || fetchMarketItem.fulfilled,
      (_state, _actions) => {}
    );
    builder.addCase(
      createMarketSale.fulfilled || createToken.fulfilled,
      (state, _actions) => {
        state.loading = false;
      }
    );
  },
});
const reducer = item.reducer;

export const { setAccount, setLoading } = item.actions;
export default reducer;

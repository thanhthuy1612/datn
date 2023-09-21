import { MetaMaskInpageProvider } from "@metamask/providers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { checkAccount } from "../../api/account";
import { IAccount } from "../../interfaces/IRouter";
import { login } from "../../api/login";

const initialState = {
  account: undefined,
};

export interface IStateRedux {
  account: IAccount | undefined;
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnect.fulfilled, () => {});
  },
});
const reducer = item.reducer;

export const { setAccount } = item.actions;
export default reducer;

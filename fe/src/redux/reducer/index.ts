import { MetaMaskInpageProvider } from "@metamask/providers";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";

const initialState = {
  wallet: undefined,
};

export interface IStateRedux {
  wallet: string | undefined;
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
        console.log(address);
        // const result = await checkAccount(address);
        // thunkAPI.dispatch(setAccount(result[0]));
      } else {
        const state: any = thunkAPI.getState();
        console.log(state, state.wallet);
        if (state.item.wallet !== undefined) {
          const address = await signer.getAddress();
          // const result = await checkAccount(address);
          thunkAPI.dispatch(setWallet(address));
        } else {
          const address = await signer.getAddress();
          thunkAPI.dispatch(setWallet(address));
          // const sign = await signer.signMessage("Login");
          // const result = await getToken(sign);
          // thunkAPI.dispatch(setAccount(result));
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
    setWallet: (state, action) => {
      const provider = window;
      console.log(provider);
      state.wallet = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConnect.fulfilled, () => {});
  },
});
const reducer = item.reducer;

export const { setWallet } = item.actions;
export default reducer;

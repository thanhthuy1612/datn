import { IAccount } from "../interfaces/IRouter";
import { get, update } from "./index";
import { url } from "./url";

const path: string = url.account;

export const checkAccount = async (wallet: string) => {
  try {
    const res = await get(`${path}/findByWallet/${wallet}`, { params: {} });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const uploadPicture = async (wallet: string, account: IAccount) => {
  try {
    const res = await update(`${path}/updateByAccount/${wallet}`, {
      ...account,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

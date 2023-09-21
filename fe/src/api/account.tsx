import { get } from "./index";
import { url } from "./url";

const path: string = url.account;

export const checkAccount = async (wallet: string) => {
  try {
    const res = await get(`${path}/findByWallet/${wallet}`, { params: {} });
    return res;
  } catch (err) {
    console.log(err);
  }
};

import { ICart } from "../interfaces/IRouter";
import { post, get, del } from "./index";
import { url } from "./url";

const path: string = url.cart;

export const addCart = async (item: ICart) => {
  try {
    const res = await post(`${path}`, item);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCart = async (id: string) => {
  try {
    const res = await del(`${path}/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCartsByAccount = async (account: string) => {
  try {
    const res = await get(`${path}/getByAccount/${account}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCartsByTokenUri = async (item: ICart) => {
  try {
    const res = await post(`${path}/getByUri`, item);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

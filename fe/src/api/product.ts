import { del, get, post, update } from ".";
import { IProduct } from "../interfaces/IRouter";
import { url } from "./url";

const path: string = url.product;
export const addListProduct = async (item: IProduct[]) => {
  try {
    const res = await post(`${path}/list`, item);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProductsByAccount = async (account: string) => {
  try {
    const res = await get(`${path}/getByAccount/${account}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (id: string, item: IProduct) => {
  try {
    const res = await update(`${path}/${id}`, item);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await del(`${path}/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
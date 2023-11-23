import { getPicture, getPictureIPFS, postPicture } from ".";
import { create } from "ipfs-http-client";

const client = create({ url: "https://ipfs-ivirse.pokeheo.xyz/api/v0/add" });
export interface IUploadIPFS {
  img: string;
  date: number;
  create: string;
  status: boolean;
  price: number;
  description?: string;
}

export const uploadPicture = async (file: FormData) => {
  try {
    const res = await postPicture({ file });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const uploadToIPFS = async (inputs: IUploadIPFS) => {
  const data = JSON.stringify({ ...inputs });
  try {
    const added = await client.add(data);
    return added.path;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
};

export const getItem = async (url: string) => {
  try {
    const res = await getPicture(`cat?arg=${url}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getItemIPFS = async (url: string) => {
  try {
    const res = await getPictureIPFS(`cat?arg=${url}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

import { getIPFS, postPicture } from ".";

export const uploadPicture = async (file: FormData) => {
  try {
    const res = await postPicture({ file });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const uploadItem = async (option: any) => {
  try {
    const res = await postPicture(option);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getItem = async (url: any) => {
  try {
    const res = await getIPFS(url, { params: {} });
    return res;
  } catch (err) {
    console.log(err);
  }
};

import { postPicture } from ".";

export const uploadPicture = async (file: FormData) => {
  try {
    const res = await postPicture({ file });
    return res;
  } catch (err) {
    console.log(err);
  }
};

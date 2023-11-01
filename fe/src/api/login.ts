import { postLogin } from "./index";
import { url } from "./url";

const path = url.login;

export const login = async (sign: string) => {
  try {
    const res = await postLogin(path, { sign: sign });
    localStorage.setItem("token", res.data.data.token.accessToken);
    return { ...res.data.data.account };
  } catch (err) {
    console.log(err);
  }
};

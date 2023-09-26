import { getIPFS } from ".";
import { baseURLTransfer } from "./url";

export const getTransfer = async (address: string) => {
  try {
    const res = await getIPFS(
      baseURLTransfer +
        "?module=account&action=txlist" +
        "&address=" +
        address +
        "&startblock=0&endblock=99999999" +
        "&method=Create Token" +
        "&sort=asc&apikey=W5Y5FG3JIP82AHBFTK9NDINFVEBKE77BWK",
      { params: {} }
    );
    return res.result;
  } catch (err) {
    console.log(err);
  }
};

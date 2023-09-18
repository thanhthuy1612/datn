import React from "react";
import { IAccount } from "../../../interfaces/IRouter";

const Item: React.FC<{ account: IAccount }> = ({ account }) => {
  return <div className="w-[100%] cursor-pointer hover:bg-hover px-[15px] py-[10px]">{account.username}</div>;
};

export default Item;

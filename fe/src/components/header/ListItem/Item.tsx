import React from "react";
import { IAccount } from "../../../interfaces/IRouter";
import ava from "../../../assets/ava.png";

const Item: React.FC<{ account: IAccount }> = ({ account }) => {
  return (
    <div className="w-[100%] cursor-pointer hover:bg-hover px-[15px] py-[10px] flex items-center">
      <img
        src={account.ava ?? ava}
        className="w-[30px] h-[30px] mr-[15px] border-border rounded-[50%]"
      />
      <p className="font-[500]">{account.username ?? "Tên người dùng"}</p>
      <p>
        {"(" + account.wallet?.substring(0, 15)}...
        {account.wallet?.substring(35) + ")"}
      </p>
    </div>
  );
};

export default Item;

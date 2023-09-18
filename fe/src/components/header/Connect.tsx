import React from "react";
import { CiWallet, CiShoppingCart } from "react-icons/ci";
import MenuAccount from "./MenuAccount";

const Connect: React.FC = () => {
  return (
    <div className="flex h-[46px]">
      <div className="flex border-[1px] rounded-[15px] border-border items-center cursor-pointer shadow-md">
        <div className="flex items-center border-r-[1px] border-border h-[100%] hover:bg-hover hover:rounded-l-[15px]">
          <div className="px-[10px] pl-[15px]">
            <CiWallet />
          </div>
          <p className="px-[5px] w-[170px]">Kết nối ví Metamask</p>
        </div>
        <MenuAccount />
      </div>
      <div className="flex border-[1px] rounded-[15px] border-border items-center px-[10px] cursor-pointer ml-[10px] hover:bg-hover hover:rounded-[15px] shadow-md">
        <div className="px-[5px]">
          <CiShoppingCart />
        </div>
        <p className="px-[5px]">Giỏ hàng</p>
      </div>
    </div>
  );
};

export default Connect;

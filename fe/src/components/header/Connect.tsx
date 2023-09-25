import React from "react";
import { CiWallet, CiShoppingCart } from "react-icons/ci";
import MenuAccount from "./MenuAccount";
import { IStateRedux, fetchConnect, store } from "../../redux";
import { useSelector } from "react-redux";

const Connect: React.FC = () => {
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  const handleClick = async () => {
    await store.dispatch(fetchConnect(false));
  };
  return (
    <div className="flex h-[46px]">
      <div className="flex border-[1px] rounded-[15px] border-border items-center cursor-pointer shadow-md">
        <button
          onClick={handleClick}
          className="flex items-center border-r-[1px] border-border h-[100%] hover:bg-hover hover:rounded-l-[15px]">
          <p className="px-[10px] pl-[15px]">
            <CiWallet />
          </p>
          <p className="px-[5px] w-[170px]">
            {account
              ? `${account.wallet?.substring(
                  0,
                  10
                )}...${account.wallet?.substring(38)}`
              : `Kết nối ví Metamask`}
          </p>
        </button>
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

export default React.memo(Connect);

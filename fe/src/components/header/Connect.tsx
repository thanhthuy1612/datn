import React from "react";
import { CiWallet, CiShoppingCart } from "react-icons/ci";
import MenuAccount from "./MenuAccount";
import { IStateRedux, fetchConnect, store } from "../../redux";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react/headless";
import { followCursor } from "tippy.js";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { ITypeAccount } from "../../interfaces/IRouter";

const Connect: React.FC = () => {
  const { account, totalCart, loadingCart } = useSelector((state: { item: IStateRedux }) => state.item);
  const navigate = useNavigate();
  const handleClick = async () => {
    await store.dispatch(fetchConnect(false));
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(account?.wallet as string);
  };
  const handleClickCart = () => {
    navigate("/cart");
  };
  const renderTitle = () => (
    <Tippy
      interactive
      delay={[0, 10]}
      followCursor={true}
      plugins={[followCursor]}
      disabled={!account}
      render={(attrs) => (
        <div tabIndex={-1} {...attrs}>
          <p className="border-border border-[1px] px-[10px] py-[5px] rounded-[10px] shadow-md bg-white">
            Copy
          </p>
        </div>
      )}>
      <p className="px-[5px] w-[170px]">
        {account
          ? `${account.wallet?.substring(0, 10)}...${account.wallet?.substring(
            38
          )}`
          : `Kết nối ví Metamask`}
      </p>
    </Tippy>
  );
  return (
    <div className="flex h-[46px]">
      <div className="flex border-[1px] rounded-[15px] border-border items-center cursor-pointer shadow-md">
        <button
          onClick={account ? handleCopy : handleClick}
          className="flex items-center border-r-[1px] border-border h-[100%] hover:bg-hover hover:rounded-l-[15px]">
          <p className="px-[10px] pl-[15px]">
            <CiWallet />
          </p>
          {renderTitle()}
        </button>
        <MenuAccount />
      </div>
      {(account?.type === ITypeAccount.Buy || account?.type === ITypeAccount.Custom) && <Badge count={!loadingCart && account ? totalCart : null} dot={loadingCart} status={loadingCart ? 'processing' : undefined} overflowCount={99} className="flex h-[100%] items-center justify-center">
        <button
          onClick={handleClickCart}
          disabled={!account}
          className="flex border-[1px] rounded-[15px] h-[100%] border-border items-center px-[10px] cursor-pointer ml-[10px] hover:bg-hover hover:rounded-[15px] shadow-md">
          <div className="px-[5px]">
            <CiShoppingCart />
          </div>
          <p className="px-[5px]">{account?.type === ITypeAccount.Buy ? "Kho đại lý" : "Giỏ hàng"}</p>
        </button>
      </Badge>}
    </div >
  );
};

export default React.memo(Connect);

import React from "react";
import { IAccount } from "../../../interfaces/IRouter";
import ava from "../../../assets/ava.png";
import { useNavigate } from "react-router-dom";
import { IStateRedux, setAccountSearch, store } from "../../../redux";
import { useSelector } from "react-redux";

const Item: React.FC<{ account: IAccount }> = ({ account }) => {
  const item = useSelector(
    (state: { item: IStateRedux }) => state.item.account
  );
  const navigate = useNavigate();
  const handleClick = () => {
    if (item && account.wallet === item.wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };
  return (
    <button
      onClick={handleClick}
      className="w-[100%] cursor-pointer hover:bg-hover px-[15px] py-[10px] flex items-center">
      <img
        src={account.ava ?? ava}
        className="w-[30px] h-[30px] mr-[15px] border-border rounded-[50%]"
      />
      <p className="font-[500]">{account.username ?? "Tên người dùng"}</p>
      <p>
        {"(" + account.wallet?.substring(0, 15)}...
        {account.wallet?.substring(35) + ")"}
      </p>
    </button>
  );
};

export default Item;

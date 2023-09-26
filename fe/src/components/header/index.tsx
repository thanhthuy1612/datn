import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Connect from "./Connect";
import { fetchConnect, store } from "../../redux";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  window.onload = () => {
    isConnected();
  };

  async function isConnected() {
    const provider: any = window.ethereum;
    const accounts = await provider.request({
      method: "eth_accounts",
    });
    if (accounts.length && localStorage.getItem("token")) {
      await store.dispatch(fetchConnect(true));
    } else {
      navigate("/");
    }
  }
  return (
    <div className="h-[70px] flex items-center justify-between border-b-[1px] border-border mx-[50px]">
      <Logo />
      <Search />
      <Connect />
    </div>
  );
};

export default React.memo(Header);

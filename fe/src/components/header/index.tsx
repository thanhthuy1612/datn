import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Connect from "./Connect";

const Header: React.FC = () => {
  return (
    <div className="h-[70px] flex items-center justify-between border-b-[1px] border-border mx-[50px]">
      <Logo />
      <Search />
      <Connect />
    </div>
  );
};

export default Header;

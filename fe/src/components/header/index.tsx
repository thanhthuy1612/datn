import React from "react";
import Logo from "./Logo";
import Search from "./Search";

const Header: React.FC = () => {
  return (
    <div className="py-[10px] flex justify-between border-b-[1px] border-textPrimary">
      <Logo />
      <Search />
    </div>
  );
};

export default Header;

import React from "react";
import Header from "../components/header";

export interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <div className="w-[100%] mb-[50px]">
      <div className="fixed w-[100%] left-0 z-10 bg-white"><Header /></div>
      <div className="pt-[70px] px-[50px] w-[100%]">{children}</div>
    </div>
  );
};

export default DefaultLayout;

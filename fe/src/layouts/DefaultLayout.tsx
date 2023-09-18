import React from "react";
import Header from "../components/header";

export interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <>
      <div className="fixed w-[100%] left-0 z-1 bg-white"><Header /></div>
      <div className="pt-[70px] px-[50px]">{children}</div>
    </>
  );
};

export default DefaultLayout;

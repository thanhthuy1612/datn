import React from "react";
import Header from "../components/header";
import MenuSetting from "../components/menuSetting";

export interface ISettingLayout {
  children: React.ReactNode;
}

const SettingLayout: React.FC<ISettingLayout> = ({ children }) => {
  return (
    <>
      <div className="fixed w-[100%] left-0 z-1 bg-white">
        <Header />
      </div>
      <div className="pt-[70px] px-[50px] flex">
        <div className="border-border border-r-[1px] h-[100vh]"><MenuSetting /></div>
        <div className="pl-[40px]">{children}</div>
      </div>
    </>
  );
};

export default SettingLayout;

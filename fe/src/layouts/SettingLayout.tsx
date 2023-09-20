import React from "react";
import Header from "../components/header";
import MenuSetting from "../components/menuSetting";

export interface ISettingLayout {
  children: React.ReactNode;
}

const SettingLayout: React.FC<ISettingLayout> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="fixed w-[100%] left-0 z-10 bg-white">
        <Header />
      </div>
      <div className="pt-[70px] px-[50px] flex w-[100%] flex-1">
        <MenuSetting />
        <div className="pl-[40px] w-[100%]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;

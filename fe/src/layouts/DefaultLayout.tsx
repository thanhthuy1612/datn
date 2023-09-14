import React from "react";
import Header from "../components/header";

export interface IDefaultLayout {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <div className="px-[50px]">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;

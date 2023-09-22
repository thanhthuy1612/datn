import React from "react";
import HeaderProfile from "./HeaderProfile";
import { IStateRedux } from "../../redux";
import { useSelector } from "react-redux";

const Pesonal: React.FC = () => {
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  return (
    <div className="w-[100%]">
      <HeaderProfile account={account} />
    </div>
  );
};

export default Pesonal;

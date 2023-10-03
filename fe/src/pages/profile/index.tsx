import React from "react";
import HeaderProfile from "./HeaderProfile";
import { IStateRedux } from "../../redux";
import { useSelector } from "react-redux";
import CreateNFT from "./CreateNFT";
import ListNFT from "./ListNFT";

const Pesonal: React.FC = () => {
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);
  return (
    <div className="w-[100%]">
      <HeaderProfile account={account} personal={true} />
      <CreateNFT />
      <ListNFT />
    </div>
  );
};

export default Pesonal;

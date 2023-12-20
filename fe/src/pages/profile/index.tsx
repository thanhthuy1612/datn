import React from "react";
import HeaderProfile from "./HeaderProfile";
import { IStateRedux } from "../../redux";
import { useSelector } from "react-redux";
import CreateNFT from "./CreateNFT";
import ListNFT from "./ListNFT";
import { ITypeAccount } from "../../interfaces/IRouter";
import ListShip from "./ListShip";
import ListBuy from "./ListBuy";

const Pesonal: React.FC = () => {
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);
  const renderBody = () => {
    switch (account?.type) {
      case ITypeAccount.Farm:
        return <>
          <CreateNFT />
          <ListNFT />
        </>
      case ITypeAccount.Ship:
        return <ListShip/>
      case ITypeAccount.Buy:
        return <ListBuy/>
      case ITypeAccount.None:
        <></>
    }
  }
  return (
    <div className="w-[100%]">
      <HeaderProfile account={account} personal={true} />
      {renderBody()}
    </div>
  );
};

export default Pesonal;

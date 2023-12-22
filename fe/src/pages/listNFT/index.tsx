import React from "react";
import ListNFT from "../profile/ListNFT";
import { useSelector } from "react-redux";
import { IStateRedux } from "../../redux";
import { ITypeAccount } from "../../interfaces/IRouter";
import ListBuy from "../profile/ListBuy";
import ListShip from "../profile/ListShip";

const MyNFT: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  const renderBody = () => {
    switch (account?.type) {
      case ITypeAccount.Farm:
        return <ListNFT />
      case ITypeAccount.Buy:
        return <ListBuy />
      case ITypeAccount.Ship:
        return <ListShip />
    }
  }
  return (
    <div className="pt-[20px] w-[100%] overflow-hidden">
      <div className="w-[100%] text-[25px] flex justify-center">
        <p className="w-[400px] text-[25px] flex justify-center border-border border-[2px] rounded-[20px] p-[20px]">
          Kho sản phẩm
        </p>
      </div>
      <div className="pb-[30px]">
        {renderBody()}
      </div>
    </div>
  );
};

export default MyNFT;

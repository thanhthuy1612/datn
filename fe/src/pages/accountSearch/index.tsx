import React from "react";
import HeaderProfile from "../profile/HeaderProfile";
import { useSelector } from "react-redux";
import { IStateRedux } from "../../redux";
import ListNFTAccount from "./ListNFTAccount";
import { ITypeAccount } from "../../interfaces/IRouter";

const AccountSearch: React.FC = () => {
  const { accountSearch } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);

  return (
    <div className="w-[100%]">
      <HeaderProfile account={accountSearch} personal={false} />
      {accountSearch?.type === ITypeAccount.Farm && <ListNFTAccount wallet={accountSearch?.wallet ?? ""} />}
    </div>
  );
};

export default AccountSearch;

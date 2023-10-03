import React from "react";
import { IAccount } from "../../../interfaces/IRouter";
import Item from "./Item";
import { useSelector } from "react-redux";
import { IStateRedux } from "../../../redux";

const ListItem: React.FC<{
  accounts: IAccount[];
  title: string;
  setBlur: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ accounts, title, setBlur }) => {
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  const renderLogin = () => (
    <div
      onBlur={() => {
        setBlur(false);
      }}>
      {accounts.length > 0 ? (
        <>
          <p className="px-[15px] py-[5px] pb-[10px] border-b-[1px] border-border">
            Kết quả tìm kiếm: {title}
          </p>
          {accounts.map((item) => (
            <Item key={item.id} account={item} />
          ))}
        </>
      ) : (
        <p className="flex justify-center py-[5px]">
          Không tìm thấy kết quả trùng khớp.
        </p>
      )}
    </div>
  );
  const renderNotLogin = () => (
    <p className="flex justify-center py-[5px]">Vui lòng kết nối ví Metamask</p>
  );
  return (
    <div className="border-[1px] border-border bg-white rounded-[15px] w-[600px] py-[15px] flex max-h-[min((100vh - 96px) - 60px, 734px)] flex-col shadow-md z-10">
      {account ? renderLogin() : renderNotLogin()}
    </div>
  );
};

export default ListItem;

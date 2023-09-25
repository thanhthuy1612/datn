import React from "react";
import { IAccount } from "../../../interfaces/IRouter";
import Item from "./Item";

const ListItem: React.FC<{ accounts: IAccount[] }> = ({ accounts }) => {
  return (
    <div className="border-[1px] border-border bg-white rounded-[15px] w-[600px] py-[15px] flex max-h-[min((100vh - 96px) - 60px, 734px)] flex-col shadow-md z-10">
      {accounts.length > 0 ? (
        <div>
          <p className="px-[15px] py-[5px] pb-[10px] border-b-[1px] border-border">
            Kết quả tìm kiếm:{" "}
          </p>
          {accounts.map((item) => (
            <Item key={item.id} account={item} />
          ))}
        </div>
      ) : (
        <p className="flex justify-center py-[5px]">
          Không tìm thấy kết quả trùng khớp.
        </p>
      )}
    </div>
  );
};

export default React.memo(ListItem);

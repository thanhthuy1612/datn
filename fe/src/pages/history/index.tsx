import React from "react";
import TableList from "./TableList";

const History: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);
  return (
    <div className="mt-[20px] w-[100%] border-border border-[1px] shadow-md rounded-[20px] overflow-hidden">
      <p className="w-[100%] text-[25px] flex justify-center items-center border-border border-b-[1px] p-[20px]">
        Lịch sử giao dịch
      </p>
      <div className="p-[50px]">
        <TableList />
      </div>
    </div>
  );
};

export default History;

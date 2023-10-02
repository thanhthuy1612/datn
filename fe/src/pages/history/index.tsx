import React from "react";
import HistoryTag from "./HistoryTag";

const History: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);
  return (
    <div className="pt-[20px] w-[100%] overflow-hidden">
      <div className="w-[100%] text-[25px] flex justify-center">
        <p className="w-[400px] text-[25px] flex justify-center border-border border-[2px] rounded-[20px] p-[20px]">
          Lịch sử giao dịch
        </p>
      </div>
      <div className="pb-[30px]">
        <HistoryTag />
      </div>
    </div>
  );
};

export default History;

import React from "react";
import ListNFT from "../profile/ListNFT";

const MyNFT: React.FC = () => {
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
          Bộ sưu tập
        </p>
      </div>
      <div className="pb-[30px]">
        <ListNFT />
      </div>
    </div>
  );
};

export default MyNFT;

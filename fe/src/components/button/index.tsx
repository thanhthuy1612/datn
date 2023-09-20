import React from "react";
import test from "../../assets/carousel1.jpg";

const ButtonItem: React.FC = () => {
  return (
    <div className="border-border border-[2px] m-[15px] rounded-[15px] overflow-hidden shadow-xl hover:mt-[-5px] hover:shadow-2xl">
      <img src={test} className="w-[100%] h-[300px]" />
      <div className="flex flex-col p-[25px]">
        <p className="mt-[5px] mb-[15px] text-[25px] w-[250px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          Title test hidden 1234566666666666666666666666666666
        </p>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <p className="text-[15px] pb-[5px] text-textButton">Time</p>
            <p className="text-[18px] font-[500]">16/12/2023</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[15px] pb-[5px] text-textButton">Giá</p>
            <p className="text-[18px] font-[500]">0.01 ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonItem;

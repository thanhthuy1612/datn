import React from "react";
import { Image } from "antd";
import { setLoading, store } from "../../redux";
import { useLocation } from "react-router-dom";
import More from "./More";
import ShowLayout from "../../layouts/ShowLayout";

const MyListNFT: React.FC = () => {
  const localtion = useLocation();
  const item = localtion.state;

  React.useEffect(() => {
    store.dispatch(setLoading(false));
  }, []);

  const renderProfileNFT = () => (
    <div className="rounded-[20px] flex flex-col justify-between pb-[60px]">
      <div className="rounded-[20px] flex flex-col">
        <p className="mt-[5px] mb-[10px] text-[35px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {item.title.toUpperCase()}
        </p>
        <div className="flex items-center pt-[15px] py-[5px]">
          Ngày tạo: {item.date}
        </div>
        <div className="flex items-center pt-[15px] py-[5px] mb-[20px]">
          Mô tả: {item.description}
        </div>
        {item.price > 0 && <div className="py-[5px]">Giá mua: {item.price} BNBT</div>}
        <More items={item} />
      </div>
    </div>
  );
  const renderBody = () => (
    <div className="py-[40px] flex w-[100%] justify-around">
      <div className="w-[450px] h-[450px] flex bg-hover items-center rounded-[20px] shadow-md overflow-hidden">
        <Image width={"100%"} height={"100%"} style={{objectFit: "cover"}} src={item.img} />
      </div>
      <div className="flex w-[700px] justify-between">
        {renderProfileNFT()}
      </div>
    </div>)
  return (
    <ShowLayout chidren={renderBody()} title="Đã mua NFT" />
  );
};

export default MyListNFT;

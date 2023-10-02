import React from "react";
import { Image } from "antd";
import { CiClock1 } from "react-icons/ci";
import { useSelector } from "react-redux";
import { IStateRedux, createMarketSale, store } from "../../redux";
import { useNavigate } from "react-router-dom";

const BuyNFT: React.FC = () => {
  const { item } = useSelector((state: { item: IStateRedux }) => state.item);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!item) {
      navigate("/");
    }
  }, []);
  const handleBuy = async () => {
    await store.dispatch(createMarketSale(item));
  };
  return (
    <div className="mt-[20px] w-[100%] border-border border-[1px] shadow-md rounded-[20px] overflow-hidden">
      <p className="w-[100%] text-[25px] flex justify-center items-center border-border border-b-[1px] p-[20px]">
        Mua NFT
      </p>
      <div className="py-[50px] flex w-[100%] justify-around">
        <div className="w-[500px] h-[500px] rounded-[20px] shadow-md overflow-hidden">
          <Image width={"100%"} height={500} src={item.img} />
        </div>
        <div className="w-[700px] rounded-[20px] flex flex-col justify-between">
          <div>
            <p className="mt-[5px] mb-[10px] text-[35px] w-[700px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
              {item.title.toUpperCase()}
            </p>
            <p>
              Chủ sở hữu hiện tại:{" "}
              <button className="font-[500] pl-[5px]">{item.seller}</button>
            </p>
            <div className="flex items-center pt-[15px]">
              Ngày bắt đầu bán: {item.date}
            </div>
            <p className="py-[5px]">Số lần mua còn lại: {item.number}</p>
          </div>
          <div className="border-border border-[1px] py-[30px] rounded-[20px] w-[100%] shadow-md">
            <p className="flex items-center border-border px-[30px] pb-[30px] border-b-[1px] w-[100%]">
              <div className="pr-[10px]">
                <CiClock1 />
              </div>{" "}
              Thời gian hết hạn bán NFT: {item.expired}
            </p>
            <div className="w-[100%]">
              <p className="py-[20px] text-[30px] flex justify-center">
                Giá bán: {item.price} ETH
              </p>
              <div className="flex w-[100%] justify-around">
                <button
                  onClick={handleBuy}
                  className="border-border border-[1px] py-[20px] w-[300px] rounded-[20px] shadow-md hover:shadow-xl hover:bg-hover">
                  Mua ngay
                </button>
                <button className="border-border border-[1px] py-[20px] w-[300px] rounded-[20px] shadow-md hover:shadow-xl hover:bg-hover">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNFT;

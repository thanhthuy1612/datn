import React from "react";
import test from "../../assets/logo.png";
import { Image } from "antd";
import { CiClock1, CiRead } from "react-icons/ci";
import { dateFormat } from "../../ultis";
import { DateFormatType } from "../../interfaces/IRouter";

const BuyNFT: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);
  return (
    <div className="mt-[20px] w-[100%] border-border border-[1px] shadow-md rounded-[20px] overflow-hidden">
      <p className="w-[100%] text-[25px] flex justify-center items-center border-border border-b-[1px] p-[20px]">
        Mua NFT
      </p>
      <div className="py-[50px] flex w-[100%] justify-around">
        <div className="w-[500px] h-[500px] rounded-[20px] shadow-md overflow-hidden">
          <Image width={"100%"} height={500} src={test} />
        </div>
        <div className="w-[700px] rounded-[20px] flex flex-col justify-between">
          <div>
            <p className="mt-[5px] mb-[10px] text-[25px] w-[700px] overflow-hidden whitespace-nowrap overflow-ellipsis">
              Test 123456799999999999999999
            </p>
            <p>
              Chủ sở hữu hiện tại: <button>0x000000</button>
            </p>
            <div className="flex items-center pt-[30px]">
              <div className="pr-[10px]">
                <CiRead />
              </div>{" "}
              123 lượt xem
            </div>
            <p className="py-[10px]">Số lần mua còn lại: 5</p>
          </div>
          <div className="border-border border-[1px] py-[30px] rounded-[20px] w-[100%] shadow-md">
            <p className="flex items-center border-border px-[30px] pb-[30px] border-b-[1px] w-[100%]">
              <div className="pr-[10px]">
                <CiClock1 />
              </div>{" "}
              Thời gian hết hạn bán NFT:{" "}
              {dateFormat(new Date(), DateFormatType.FullDate)}
            </p>
            <div className="w-[100%]">
              <p className="px-[30px] py-[50px] text-[30px] flex justify-center">
                Giá bán: 0.01 ETH
              </p>
              <div className="flex w-[100%] justify-around">
                <button className="border-border border-[1px] py-[20px] w-[300px] rounded-[20px] shadow-md hover:shadow-xl hover:bg-hover">
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

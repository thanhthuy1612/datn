import React from "react";
import { Carousel } from "antd";
import { CiDeliveryTruck, CiShop, CiShoppingBasket, CiShuffle, CiWheat } from "react-icons/ci";
import carousel1 from "../../assets/carousel1.jpg"
import carousel2 from "../../assets/carousel2.png"
import carousel3 from "../../assets/carousel3.jpg"

interface ICarousel {
  id: number;
  banner: React.ReactNode;
}
const renderCarosel1 = () => (
  <div className="h-[100%] flex justify-center items-center relative">
    <img alt="1" src={carousel1} className="w-[100%] h-auto" />
    <p className="absolute flex justify-center top-[150px] py-[40px] text-[50px] bg-[rgba(255,255,255,0.7)] w-[100%] font-[700]">TRUY XUẤT NGUỒN GỐC SẢN PHẨM</p>
  </div>
)

const renderCarosel2 = () => (
  <div className="h-[100%] flex justify-center items-center relative">
    <img alt="1" src={carousel2} className="w-[100%] h-auto" />
    <div className="absolute bg-[rgba(0,0,0,0.7)] py-[40px] top-[60px] w-[100%]">
      <div className="flex justify-around items-center">
        <div className="w-[300px] flex flex-col items-center">
          <CiWheat className="h-[80px] w-[80px] text-white" />
          <p className="text-[30px] text-white">Nhà sản xuất</p>
        </div>
        <CiShuffle className="h-[80px] w-[80px] text-white" />
        <div className="w-[300px] flex flex-col items-center">
          <CiDeliveryTruck className="h-[80px] w-[80px] text-white" />
          <p className="text-[30px] text-white">Vận chuyển</p>
        </div>
        <CiShuffle className="h-[80px] w-[80px] text-white" />
        <div className="w-[300px] flex flex-col items-center">
          <CiShop className="h-[80px] w-[80px] text-white" />
          <p className="text-[30px] text-white">Đại lý</p>
        </div>
        <CiShuffle className="h-[80px] w-[80px] text-white" />
        <div className="w-[300px] flex flex-col items-center">
          <CiShoppingBasket className="h-[80px] w-[80px] text-white" />
          <p className="text-[30px] text-white">Người tiêu dùng</p>
        </div>
      </div>
      <p className="text-[30px] text-white mt-[50px] flex w-[100%] justify-center border-t-white border-t-[1px] pt-[30px]">MÔ HÌNH HỆ THỐNG TRUY XUẤT NGUỒN GỐC SẢN PHẨM</p>
    </div>
  </div>
)

const renderCarosel3 = () => (
  <div className="h-[100%] flex justify-center items-center relative">
    <img alt="1" src={carousel3} className="w-[100%] h-auto" />
  </div>
)

const carousel: ICarousel[] = [
  {
    id: 1,
    banner: renderCarosel1(),
  },
  {
    id: 2,
    banner: renderCarosel2(),
  },
  {
    id: 3,
    banner: renderCarosel3(),
  },
];

const CarouselHome: React.FC = () => (
  <div className="z-0 w-[100%] rounded-[20px] shadow-2xl overflow-hidden">
    <Carousel autoplay>
      {carousel.map((item: ICarousel) => (
        <div
          className="w-[100%] h-[450px] bg-hover rounded-[20px] shadow-2xl border-border border-[1px]"
          key={item.id}>
          {item.banner}
        </div>
      ))}
    </Carousel>
  </div>
);

export default React.memo(CarouselHome);

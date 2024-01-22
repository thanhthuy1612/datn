import React from "react";
import { Carousel } from "antd";
import carousel1 from "../../assets/carousel1.png"
import carousel2 from "../../assets/carousel2.png"
import carousel3 from "../../assets/carousel3.png"
import carousel4 from "../../assets/carousel4.jpg"

interface ICarousel {
  id: number;
  banner: string;
}

const carousel: ICarousel[] = [
  {
    id: 1,
    banner: carousel1,
  },
  {
    id: 2,
    banner: carousel2,
  },
  {
    id: 3,
    banner: carousel3,
  },
  {
    id: 4,
    banner: carousel4,
  },
];

const CarouselHome: React.FC = () => (
  <div className="z-0 w-[100%] rounded-[20px] shadow-2xl overflow-hidden">
    <Carousel autoplay>
      {carousel.map((item: ICarousel) => (
        <div
          className="w-[100%] h-[400px] rounded-[20px] shadow-2xl border-border border-[1px]"
          key={item.id}>
          <img
            src={item.banner}
            className="w-full h-full rounded-[20px] shadow-2xl"
            key={item.id}
          />
        </div>
      ))}
    </Carousel>
  </div>
);

export default React.memo(CarouselHome);

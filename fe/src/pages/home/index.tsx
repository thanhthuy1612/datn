import React from "react";
import CarouselHome from "./Carousel";
import TabsHome from "./Tabs";

const Home: React.FC = () => {
  return (
    <div className="pt-[20px]">
      <CarouselHome />
      <TabsHome />
    </div>
  );
};

export default Home;

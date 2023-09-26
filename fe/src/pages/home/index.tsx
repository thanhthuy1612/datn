import React from "react";
import CarouselHome from "./Carousel";
import NewNFT from "./NewNFT";
import OldNFT from "./OldNFT";
import { CiBank, CiCloudMoon, CiCloudSun } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IStateRedux } from "../../redux";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);

  const refNew = React.useRef<null | HTMLDivElement>(null);
  const refOld = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);

  const handleClickPerson = () => {
    navigate("/personal");
  };

  const handleNew = () => {
    refNew.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleOld = () => {
    refOld.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-[20px]">
      <CarouselHome />
      <div className="mt-[60px] w-[100%] border-border border-[2px] rounded-[20px] shadow-md py-[30px]">
        <p className="w-[100%] flex justify-center text-[25px] font-[500] pb-[20px] border-border border-b-[2px]">
          Trang chủ
        </p>
        <div className="flex px-[30px] pt-[30px]">
          <div className="w-[600px] border-border border-[2px] rounded-[20px] pt-[30px] shadow-md mr-[40px]">
            <p className="w-[100%] flex justify-center text-[20px] py-[10px] pb-[20px] border-border border-b-[2px]">
              Xem trang cá nhân của bạn
            </p>
            <div className="flex justify-around py-[30px]">
              <button
                onClick={handleClickPerson}
                disabled={account === undefined}
                className={
                  account === undefined
                    ? "flex items-center justify-center w-[300px] border-[2px] border-border py-[20px] rounded-[20px] shadow-md cursor-not-allowed"
                    : "flex items-center justify-center w-[300px] border-[2px] border-border py-[20px] rounded-[20px] shadow-md hover:bg-hover hover:shadow-xl"
                }>
                Về trang cá nhân của bạn
                <div className="px-[10px]">
                  <CiBank />
                </div>
              </button>
            </div>
          </div>
          <div className="w-[100%] border-border border-[2px] rounded-[20px] pt-[30px] shadow-md">
            <p className="w-[100%] flex justify-center text-[20px] py-[10px] pb-[20px] border-border border-b-[2px]">
              Bạn muốn xem thông tin gì?
            </p>
            <div className="flex justify-around py-[30px]">
              <button
                onClick={handleNew}
                className="flex items-center justify-center w-[300px] border-[2px] border-border py-[20px] rounded-[20px] shadow-md hover:bg-hover hover:shadow-xl">
                NFT mới nhất{" "}
                <div className="px-[10px]">
                  <CiCloudSun />
                </div>
              </button>
              <button
                onClick={handleOld}
                className="flex items-center justify-center w-[300px] border-[2px] border-border py-[20px] rounded-[20px] shadow-md hover:bg-hover hover:shadow-xl">
                Kho lưu trữ NFT
                <div className="px-[10px]">
                  <CiCloudMoon />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={refNew}>
        <NewNFT />
      </div>
      <div ref={refOld}>
        <OldNFT />
      </div>
    </div>
  );
};

export default Home;

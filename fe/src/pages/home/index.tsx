import React from "react";
import CarouselHome from "./Carousel";
import NewNFT from "./NewNFT";
import OldNFT from "./OldNFT";
import {
  CiCloud,
  CiCloudMoon,
  CiCloudRainbow,
  CiCloudSun,
  CiStar,
} from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IStateRedux, fetchConnect, store } from "../../redux";
import { useSelector } from "react-redux";
import ListNFT from "../profile/ListNFT";
import login from "../../assets/dangnhap.png";
import create from "../../assets/taoNFT.png";
import buy from "../../assets/buy.png";

interface IText {
  id: number;
  text: string;
}
interface ITextInstruct {
  id: number;
  text: string;
  img: string;
  description?: string;
}
const textIntroduce: IText[] = [
  {
    id: 1,
    text: "Sản phẩm là một sàn giao dịch các non-fungible (NFTs). Sàn sẽ cho phép người dùng đăng bán, trao đổi và giao dịch những tài sản NFT của mình dựa trên các smart contract trong công nghệ blockchain.",
  },
  {
    id: 2,
    text: "Trên sàn anh em có thể tham gia trao đổi, mua bán các vật phẩm sưu tầm NFT, vật phẩm hoặc các nhân vật trong Game, các video nghệ thuật,....",
  },
  {
    id: 3,
    text: "Sản phẩm được xây dựng và thiết kế gần như phù hợp với xu hướng thị trường hiện tại, tạo một nguồn thanh khoản lớn cho số lượng lớn NFTs trong crypto & cả non-crypto..",
  },
];

const textCharacteristic: IText[] = [
  {
    id: 1,
    text: "Các giao dịch sẽ được thể hiện dưới dạng hợp đồng thông minh (Smart Contract), không cần thông qua trung gian thứ ba nào.",
  },
  {
    id: 2,
    text: "Hạn chế các vấn đề rủi ro về sàn bởi các tài sản sẽ được lưu trữ trực tiếp trên ví của người dùng.",
  },
  {
    id: 3,
    text: "Người dùng có thể toàn quyền sở hữu các NFTs đã mua trên sàn.",
  },
  {
    id: 4,
    text: "Giao dịch tự do, không ràng buộc và mức phí hợp lý.",
  },
];

const textInstruct: ITextInstruct[] = [
  {
    id: 1,
    text: "Kết nối ví Metamask",
    img: login,
    description:
      "Sau khi vào trang chủ nhấn vào 1 trong 2 nút tô đổ để kết nối ví:",
  },
  {
    id: 2,
    text: "Tạo NFT mới",
    img: create,
    description:
      "Chọn tạo trong menu nhập đầy đủ thông tin yêu cầu và nhấn -Thêm NFT-",
  },
  {
    id: 3,
    text: "Mua NFT",
    img: buy,
    description:
      "Người dùng chọn NFT sau đó chọn -Mua ngay- thanh toán và NFT sẽ tự động vào kho của bạn",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);

  const refNew = React.useRef<null | HTMLDivElement>(null);
  const refOld = React.useRef<null | HTMLDivElement>(null);
  const refMyNFT = React.useRef<null | HTMLDivElement>(null);

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
  const handleMyNFT = () => {
    refMyNFT.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleClickLogin = async () => {
    await store.dispatch(fetchConnect(false));
  };
  const renderLogin = () => (
    <>
      <div className="mt-[60px] w-[100%] rounded-[20px] py-[30px]">
        <div className="w-[100%] border-border border-[2px] rounded-[20px] pt-[10px]">
          <p className="w-[100%] flex justify-center text-[20px] py-[10px] pb-[20px] border-border border-b-[2px]">
            Bạn muốn xem thông tin gì?
          </p>
          <div className="flex justify-around py-[60px]">
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
            <button
              onClick={handleMyNFT}
              className="flex items-center justify-center w-[300px] border-[2px] border-border py-[20px] rounded-[20px] shadow-md hover:bg-hover hover:shadow-xl">
              NFT của bạn
              <div className="px-[10px]">
                <CiCloudRainbow />
              </div>
            </button>
            <button
              onClick={handleClickPerson}
              disabled={account === undefined}
              className={
                account === undefined
                  ? "flex items-center justify-center w-[300px] border-[2px] border-border py-[20px] rounded-[20px] cursor-not-allowed"
                  : "flex items-center justify-center w-[300px] border-[2px] border-border py-[20px] rounded-[20px] shadow-md hover:bg-hover hover:shadow-xl"
              }>
              Trang cá nhân của bạn
              <div className="px-[10px]">
                <CiCloud />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div ref={refNew}>
        <NewNFT />
      </div>
      <div ref={refOld}>
        <OldNFT />
      </div>
      <div ref={refMyNFT}>
        <ListNFT />
      </div>
    </>
  );
  const renderItem = ({ title }: { title: string }) => (
    <p className="py-[10px] flex items-center">
      <div className="pr-[15px]">
        <CiStar />
      </div>
      {title}
    </p>
  );
  const renderItemInstruct = ({
    title,
    img,
    description,
  }: {
    title: string;
    img: string;
    description: string;
  }) => (
    <p className="py-[10px] flex items-start">
      <div className="pr-[15px] pt-[5px]">
        <CiStar />
      </div>
      <div>
        <p className="text-[20px] pb-[10px]">{title}</p>
        <p className="pb-[10px]">{description}</p>
        <img src={img} className="rounded-[15px] w-[100%]" />
      </div>
    </p>
  );
  const renderButtonLogin = () => (
    <>
      <div className="mt-[30px] w-[100%] rounded-[20px] py-[25px] flex justify-center flex-col items-center">
        <p className="text-[25px]">Vui lòng kết nối ví Metamask</p>
        <button
          onClick={handleClickLogin}
          className="my-[20px] py-[10px] px-[30px] w-[200px] border-border border-[1px] rounded-[15px] shadow-md hover:shadow-xl hover:bg-hover">
          Kết nối ví
        </button>
      </div>

      <div className="flex h-[70px] items-end w-[100%] mt-[30px] w-[100%] z-0">
        <p className="p-[20px] text-[20px] flex items-center justify-center w-[400px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]">
          Giới thiệu về sản phẩm
        </p>
        <div className="border-b-[1px] border-border w-[calc(100%-418px)] rounded-[20px]"></div>
      </div>
      <div className="py-[30px] px-[50px] w-[100%] border-[2px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl">
        {textIntroduce.map((item) => renderItem({ title: item.text }))}
      </div>

      <div className="flex h-[70px] items-end w-[100%] mt-[50px] w-[100%] z-0">
        <p className="p-[20px] text-[20px] flex items-center justify-center w-[400px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]">
          Điểm nổi bật của sản phẩm
        </p>
        <div className="border-b-[1px] border-border w-[calc(100%-418px)] rounded-[20px]"></div>
      </div>
      <div className="py-[30px] px-[50px] w-[100%] border-[2px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl">
        {textCharacteristic.map((item) => renderItem({ title: item.text }))}
      </div>

      <div className="flex h-[70px] items-end w-[100%] mt-[50px] w-[100%] z-0">
        <p className="p-[20px] text-[20px] flex items-center justify-center w-[400px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]">
          Hướng dẫn sử dụng
        </p>
        <div className="border-b-[1px] border-border w-[calc(100%-418px)] rounded-[20px]"></div>
      </div>
      <div className="py-[30px] px-[50px] w-[100%] border-[2px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl">
        {textInstruct.map((item) =>
          renderItemInstruct({
            title: item.text,
            img: item.img,
            description: item.description ?? "",
          })
        )}
      </div>
    </>
  );

  return (
    <div className="pt-[20px]">
      <CarouselHome />
      {account ? renderLogin() : renderButtonLogin()}
    </div>
  );
};

export default Home;

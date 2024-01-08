import React from "react";
import CarouselHome from "./Carousel";
import OldNFT from "./OldNFT";
import {
  CiCloudMoon,
  CiCloudRainbow,
  CiCloudSun,
  CiMenuBurger,
  CiStar,
} from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IStateRedux, fetchConnect, setAccount, store } from "../../redux";
import { useSelector } from "react-redux";
import ListNFT from "../profile/ListNFT";
import login from "../../assets/dangnhap.png";
import create from "../../assets/taoNFT.png";
import buy from "../../assets/buy.png";
import resellNFT from "../../assets/banlai.png";
import Tippy from "@tippyjs/react/headless";
import { followCursor } from "tippy.js";
import { ITypeAccount } from "../../interfaces/IRouter";
import { Button, Form, Radio } from "antd";
import { uploadPicture } from "../../api/account";
import ListShip from "../profile/ListShip";
import ListBuy from "../profile/ListBuy";
import ShipNFT from "./ShipNFT";
import CustomNFT from "./CustomNFT";
import ListCustom from "../profile/ListCustom";
import ListBuyer from "../profile/ListBuyer";

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

interface IMenu {
  id: number;
  handle: () => void;
  title: string;
  icon: any;
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
const textSetting: IText[] = [
  {
    id: 1,
    text: "Phần lớn thị trường NFT đều nằm trong Blockchain Ethereum. Do đó, điều kiện đầu tiên và quan trọng để có thể thực hiện giao dịch trên sàn là bạn phải sở hữu một chiếc ví điện tử để tương tác với Ethereum, thanh toán phí cũng như nhận các khoản mua bán khác. Ở đây chúng tôi sử dụng Metamask do Metamask được xem là ví thông dụng nhất.",
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
    text: "Tạo sản phẩm mới",
    img: create,
    description:
      "Chọn tạo trong menu nhập đầy đủ thông tin yêu cầu và nhấn -Thêm  sản phẩm-",
  },
  {
    id: 3,
    text: "Mua",
    img: buy,
    description:
      "Người dùng chọn NFT sau đó chọn -Mua ngay- thanh toán và NFT sẽ tự động vào kho của bạn",
  },
  {
    id: 4,
    text: "Bán lại NFT",
    img: resellNFT,
    description:
      "Người dùng chọn NFT trong kho của mình sau đó nhập đầy đủ thông tin chọn -Bán lại NFT-",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);

  const onFinish = async (values: any) => {
    const result = await uploadPicture(account?.wallet as string, {
      type: values.type as ITypeAccount
    });
    await store.dispatch(setAccount(result.data[0]));
  };
  const refOld = React.useRef<null | HTMLDivElement>(null);
  const refMyNFT = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    handleTop();
  }, []);

  const handleClickPerson = () => {
    navigate("/personal");
  };

  const handleOld = () => {
    refOld.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleMyNFT = () => {
    refMyNFT.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  };
  const handleClickLogin = async () => {
    await store.dispatch(fetchConnect(false));
  };

  const menu: IMenu[] = [
    {
      id: 1,
      handle: handleOld,
      title: "Tất cả sản phẩm",
      icon: <CiCloudSun />,
    },
    {
      id: 2,
      handle: handleMyNFT,
      title: "Sản phẩm của bạn",
      icon: <CiCloudRainbow />,
    },
    {
      id: 3,
      handle: handleClickPerson,
      title: "Trang cá nhân",
      icon: <CiCloudMoon />,
    },
  ];

  const renderBody = () => {
    switch (account?.type) {
      case ITypeAccount.Farm:
        return <>
          <div ref={refOld}>
            <OldNFT />
          </div>
          <div ref={refMyNFT}>
            <ListNFT />
          </div>
        </>
      case ITypeAccount.Ship:
        return <>
          <div ref={refOld}>
            <ShipNFT />
          </div>
          <div ref={refMyNFT}>
            <ListShip />
          </div>
        </>
      case ITypeAccount.Buy:
        return <>
          <div ref={refOld}>
            <OldNFT />
          </div>
          <div ref={refMyNFT}>
            <ListBuy />
            <ListBuyer/>
          </div>
        </>
      case ITypeAccount.Custom:
        return <>
        <div ref={refOld}>
          <CustomNFT />
        </div>
        <div ref={refMyNFT}>
          <ListCustom />
        </div>
      </>
      case ITypeAccount.None:
        <></>
    }
  }

  const renderButton = (item: IMenu) => (
    <button
      onClick={item.handle}
      className="flex items-center justify-center w-[350px] border-[2px] border-border py-[20px] rounded-[20px] shadow-md hover:bg-hover hover:shadow-xl"
    >
      {item.title}
      <div className="px-[10px]">{item.icon}</div>
    </button>
  );
  const renderLogin = () => (
    <>
      <div className="mt-[60px] w-[100%] rounded-[20px] py-[30px]">
        <div className="w-[100%] border-border border-[2px] rounded-[20px] pt-[10px]">
          <p className="w-[100%] flex justify-center text-[20px] py-[10px] pb-[20px] border-border border-b-[2px]">
            Bạn muốn xem thông tin gì?
          </p>
          <div className="flex justify-around py-[60px]">
            {menu.map((item) => (
              <div key={item.id}>{renderButton(item)}</div>
            ))}
          </div>
        </div>
      </div>
      {renderBody()}
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
  const renderTagHome = ({
    title,
    items,
  }: {
    title: string;
    items: IText[];
  }) => (
    <>
      <div className="flex h-[70px] items-end w-[100%] mt-[30px] w-[100%] z-0">
        <p className="p-[20px] text-[20px] flex items-center justify-center w-[400px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]">
          {title}
        </p>
        <div className="border-b-[1px] border-border w-[calc(100%-418px)] rounded-[20px]"></div>
      </div>
      <div className="py-[30px] px-[50px] w-[100%] border-[2px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl">
        {items.map((item) => (
          <div key={item.id}>{renderItem({ title: item.text })}</div>
        ))}
      </div>
    </>
  );
  const renderListTitle = () => (
    <>
      {renderTagHome({ title: "Giới thiệu về sản phẩm", items: textIntroduce })}
      {renderTagHome({
        title: "Điểm nổi bật của sản phẩm",
        items: textCharacteristic,
      })}
      {renderTagHome({ title: "Cần chuẩn bị gì?", items: textSetting })}
      <div className="flex h-[70px] items-end w-[100%] mt-[50px] w-[100%] z-0">
        <p className="p-[20px] text-[20px] flex items-center justify-center w-[400px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]">
          Hướng dẫn sử dụng
        </p>
        <div className="border-b-[1px] border-border w-[calc(100%-418px)] rounded-[20px]"></div>
      </div>
      <div className="py-[30px] px-[50px] w-[100%] border-[2px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl">
        {textInstruct.map((item) => (
          <div key={item.id}>
            {renderItemInstruct({
              title: item.text,
              img: item.img,
              description: item.description ?? "",
            })}
          </div>
        ))}
      </div></>
  )
  const renderButtonLogin = () => (
    <>
      <div className="mt-[30px] w-[100%] rounded-[20px] py-[25px] flex justify-center flex-col items-center">
        <p className="text-[25px]">Vui lòng kết nối ví Metamask</p>
        <button
          onClick={handleClickLogin}
          className="my-[20px] py-[10px] px-[30px] w-[200px] border-border border-[1px] rounded-[15px] shadow-md hover:shadow-xl hover:bg-hover"
        >
          Kết nối ví
        </button>
      </div>
      {renderListTitle()}
    </>
  );
  const renderChooseType = () => (
    <div className="mt-[30px] w-[100%] rounded-[20px] py-[25px] flex justify-center flex-col items-center">
      <div className="py-[30px] px-[50px] w-[100%] border-[2px] rounded-r-[20px] rounded-b-[20px] shadow-xl flex flex-col items-center">
        <p className="p-[20px] text-[25px] flex items-center justify-center w-[400px] h-[100%] ">
          Vui lòng chọn vai trò của bạn
        </p>
        <p className="text-[20px] mb-[20px] underline">Lưu ý việc lựa chọn vai trò chỉ được thực hiện 1 lần duy nhất</p>
        <Form
          layout="horizontal"
          name="validate_other"
          onFinish={onFinish}
          initialValues={{
          }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="type"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
          >
            <Radio.Group>
              <Radio.Button value={ITypeAccount.Farm}>Nông dân</Radio.Button>
              <Radio.Button value={ITypeAccount.Ship}>Giao hàng</Radio.Button>
              <Radio.Button value={ITypeAccount.Buy}>Người thu mua</Radio.Button>
              <Radio.Button value={ITypeAccount.Custom}>Khách hàng</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item className="flex justify-center w-[100%]">
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
  const renderMenu = () => (
    <Tippy
      interactive
      delay={[0, 10]}
      plugins={[followCursor]}
      render={(attrs) => (
        <div
          tabIndex={-1}
          {...attrs}
          className="bg-white py-[20px] border-border border-[1px] rounded-[15px] w-[200px]"
        >
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={item.handle}
              className="flex items-center py-[5px] px-[20px] hover:bg-hover w-[100%]"
            >
              {item.icon}
              <p className="pl-[5px]">{item.title}</p>
            </button>
          ))}
        </div>
      )}
    >
      <button
        onClick={handleTop}
        className="rounded-[50%] flex justify-center items-center bg-white w-[50px] h-[50px] p-[10px] border-border border-[1px] shadow-md mx-[15px] fixed bottom-[25px] right-[40px]"
      >
        <CiMenuBurger />
      </button>
    </Tippy>
  );

  const renderBodyHome = ()=>{
    if(account){
      return account.type === ITypeAccount.None ? renderChooseType() : renderLogin()
    }
    return renderButtonLogin()
  }

  return (
    <div className="pt-[20px]">
      <CarouselHome />
      {renderBodyHome()}
      {renderMenu()}
    </div>
  );
};

export default Home;

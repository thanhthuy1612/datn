import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { getItem } from "../../api/uploadPicture";

const ButtonItem: React.FC<{
  title: string;
  date: string;
  price: string;
  img: string;
}> = ({ title, date, price, img }) => {
  const [picture, setPicture] = React.useState<string>('');
  React.useEffect(() => {
    const fetchImage = async () => {
      const res = await getItem(img)
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setPicture(imageObjectURL);
    }
    fetchImage()
  }, [img]);

  console.log(picture, 2)
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const renderloading = () => (
    <div className="w-[100%] h-[300px] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );
  return (
    <button className="border-border border-[2px] m-[15px] rounded-[15px] overflow-hidden shadow-xl hover:mt-[-5px] hover:shadow-2xl">
      {picture ? <img src={picture} className="w-[100%] h-[300px]" /> : renderloading()}
      <div className="flex flex-col p-[25px]">
        <p className="mt-[5px] mb-[15px] text-[30px] flex justify-start w-[250px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title.toUpperCase()}
        </p>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <p className="text-[15px] pb-[5px] text-textButton">Ngày bán</p>
            <p className="text-[18px] font-[500]">{date.split(",")[0]}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[15px] pb-[5px] text-textButton">Giá</p>
            <p className="text-[18px] font-[500]">{price} ETH</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ButtonItem;

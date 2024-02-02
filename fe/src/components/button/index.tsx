import React from "react";
import { useSelector } from "react-redux";
import { ITypeAccount } from "../../interfaces/IRouter";
import { IStateRedux } from "../../redux";

const ButtonItem: React.FC<{
  title: string;
  date: string;
  price: string;
  img: string;
  cart?: boolean;
  from?: string;
  to?: string;
}> = ({ title, date, price, img, cart, from, to }) => {
  const { account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const renderBody = () => {
    if (cart) {
      return <div className="flex flex-col items-start">
        <p className="text-[18px] font-[500]">Bấm để xóa khỏ giỏ hàng.</p>
        <p className="text-[15px] pb-[5px] text-textButton">Sản phẩm đã không còn trên sàn.</p>
      </div>
    }
    if (account?.type === ITypeAccount.Ship) {
      return <div className="">
        <div className="flex flex-col items-start">
          <p className="text-[18px] font-[500]">Địa chỉ lấy hàng</p>
          <p className="text-[15px] pb-[5px] text-textButton w-[250px] flex justify-start overflow-hidden whitespace-nowrap overflow-ellipsis">{from}</p>
        </div>
        <div className="flex flex-col items-start basis-[50%]">
          <p className="text-[18px] font-[500]">Địa chỉ giao hàng</p>
          <p className="text-[15px] pb-[5px] text-textButton w-[250px] flex justify-start overflow-hidden whitespace-nowrap overflow-ellipsis">{to}</p>
        </div>
      </div>
    }
    return <div className="flex justify-between">
      <div className="flex flex-col items-start">
        <p className="text-[15px] pb-[5px] text-textButton">Ngày cập nhật</p>
        <p className="text-[18px] font-[500]">{date.split(",")[0]}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-[15px] pb-[5px] text-textButton">Giá</p>
        <p className="text-[18px] font-[500]">{price} BNBT</p>
      </div>
    </div>
  }
  return (
    <button className={cart ? "border-border bg-border border-[2px] m-[15px] rounded-[15px] overflow-hidden shadow-xl hover:mt-[-5px] hover:shadow-2xl" : "border-border border-[2px] m-[15px] rounded-[15px] overflow-hidden shadow-xl hover:mt-[-5px] hover:shadow-2xl"}>
      <div className="w-[100%] h-[300px] flex items-center bg-hover">
        <img src={img} className="w-[100%] h-[100%] object-cover" />
      </div>
      <div className="flex flex-col p-[25px]">
        <p className="mt-[5px] mb-[15px] text-[30px] flex justify-start w-[250px] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {title.toUpperCase()}
        </p>
        {renderBody()}
      </div>
    </button>
  );
};

export default ButtonItem;

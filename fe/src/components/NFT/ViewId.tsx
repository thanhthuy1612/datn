import React from "react";
import { Image, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import ShowLayout from "../../layouts/ShowLayout";
import More from "./More";
import { useSelector } from "react-redux";
import { IStateRedux, fetchId, setAccountSearch, setLoading, store } from "../../redux";
import { DateFormatType, ITypeAccount } from "../../interfaces/IRouter";
import { dateFormat, defaultAddress } from "../../ultis";
import { addressContract } from "../../ultis/addressContract";
import { LoadingOutlined } from "@ant-design/icons";

const ViewId: React.FC = () => {
  const [item, setItem] = React.useState<any>(undefined);
  const localtion = useLocation();
  const id = localtion.state;
  const navigate = useNavigate();
  const { account, itemView, loading } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  console.log(id, itemView)
  React.useEffect(() => {
    const fetch = async () => {
      await store.dispatch(fetchId(id));
    }
    fetch()
  }, [id]);
  React.useEffect(() => {
    if (itemView) {
      setItem(itemView)
      store.dispatch(setLoading(false))
    }
  }, [itemView])
  const handleClick = (wallet: string) => () => {
    if (account && account.wallet === wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };
  const checkAccount = (wallet: string) => {
    if (wallet === account?.wallet) {
      return '(Bạn)'
    }
    return ""
  }

  const renderProfileNFT = () => (
    <div className="rounded-[20px] flex flex-col justify-between pb-[60px]">
      <div className="rounded-[20px] flex flex-col">
        <p className="mt-[5px] mb-[10px] text-[35px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {item?.title.toUpperCase()}
        </p>
        {item?.seller !== defaultAddress && <div className="flex items-center pt-[5px]">
          Người bán: <button onClick={handleClick(item?.seller)} className="text-settingChoose cursor-pointer underline">{item?.seller} {checkAccount(item?.seller)}</button>
        </div>}
        {item?.owner !== defaultAddress && item?.owner !== addressContract && <div className="flex items-center pt-[5px]">
          Người mua: <button onClick={handleClick(item?.owner)} className="text-settingChoose cursor-pointer underline">{item?.owner} {checkAccount(item?.owner)}</button>
        </div>}
        {item?.shipper !== defaultAddress && <div className="flex items-center pt-[5px]">
          Người giao hàng: <button onClick={handleClick(item?.shipper)} className="text-settingChoose cursor-pointer underline">{item?.shipper} {checkAccount(item?.shipper)}</button>
        </div>}
        {item?.from && <div className="flex items-center pt-[5px]">Địa chỉ người bán: {item?.from}</div>}
        {item?.to && <div className="flex items-center pt-[5px]">Địa chỉ mua: {item?.to}</div>}
        <div className="flex items-center pt-[5px]">
          Ngày cập nhật: {item?.date}
        </div>
        <div className="flex items-center pt-[5px]">
          Ngày hết hạn sản phẩm: {dateFormat(
            new Date(item?.expired),
            DateFormatType.FullDate
          )}
        </div>
        <div className="flex items-center pt-[5px] mb-[20px]">
          Mô tả: {item?.description}
        </div>
        {item?.price > 0 && account?.type !== ITypeAccount.Ship && <div className="py-[5px] text-[20px]">Giá sản phẩm: {item?.price} BNBT</div>}
        <More items={item} />
      </div>
    </div >
  );

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  const renderloading = () => (
    <div className="h-[450px] w-[100%] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );

  const renderBody = () => (
    <div className="py-[40px] flex w-[100%] justify-around">
      {loading ? renderloading() : (<><div className="w-[450px] h-[450px] rounded-[20px] shadow-md overflow-hidden">
        <Image width={"100%"} height={500} src={item?.img} />
      </div>
        <div className="flex w-[700px] justify-between">
          {renderProfileNFT()}
        </div></>)}
    </div>)
  return (
    <ShowLayout chidren={renderBody()} title="Chi tiết sản phẩm" />
  );
};

export default ViewId;

import React from "react";
import { Image, Spin } from "antd";
import { IStateRedux, setAccountSearch, setLoading, shipMarketSale, store } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import More from "./More";
import ShowLayout from "../../layouts/ShowLayout";
import { useSelector } from "react-redux";
import { dateFormat, defaultAddress } from "../../ultis";
import { DateFormatType } from "../../interfaces/IRouter";
import { LoadingOutlined } from "@ant-design/icons";

const Ship: React.FC = () => {
  const localtion = useLocation();
  const item = localtion.state;

  const navigate = useNavigate();
  const { loadingCreate, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  const handleClick = (wallet: string) => () => {
    if (account && account.wallet === wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };

  React.useEffect(() => {
    store.dispatch(setLoading(false));
  }, []);

  const onFinish = async () => {
    await store.dispatch(
      shipMarketSale({
        tokenId: item.tokenId,
      })
    );
    navigate("/");
  };

  const checkAccount = (wallet: string) => {
    if (wallet === account?.wallet) {
      return '(Bạn)'
    }
    return ""
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
  const renderloading = () => (
    <div className="w-[55px] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );

  const renderProfileNFT = () => (
    <div className="rounded-[20px] flex flex-col justify-between pb-[60px]">
      <div className="rounded-[20px] flex flex-col">
        <p className="mt-[5px] mb-[10px] text-[35px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {item.title.toUpperCase()}
        </p>
        {item.seller !== defaultAddress && <div className="flex items-center pt-[5px]">
          Người bán: <button onClick={handleClick(item.seller)} className="text-settingChoose cursor-pointer underline">{item.seller} {checkAccount(item.seller)}</button>
        </div>}
        {item.owner !== defaultAddress && <div className="flex items-center pt-[5px]">
          Người mua: <button onClick={handleClick(item.owner)} className="text-settingChoose cursor-pointer underline">{item.owner} {checkAccount(item.owner)}</button>
        </div>}
        {item.from && <div className="flex items-center pt-[5px]">Địa chỉ người bán: {item.from}</div>}
        {item.to && <div className="flex items-center pt-[5px]">Địa chỉ mua: {item.to}</div>}
        {item.kg && <div className="flex items-center pt-[5px]">Cân nặng: {item.kg / 1000} kg</div>}
        <div className="flex items-center pt-[5px]">
          Ngày cập nhật: {item.date}
        </div>
        <div className="flex items-center pt-[5px]">
          Ngày hết hạn sản phẩm: {dateFormat(
            new Date(item.expired),
            DateFormatType.FullDate
          )}</div>
        <div className="flex items-center pt-[15px] py-[5px] mb-[20px]">
          Mô tả: {item.description}
        </div>
        <More items={item} />
      </div>
      <div className="flex mt-[50px]">
        <button disabled={loadingCreate} className="border-boder border-[1px] rounded-[10px] py-[15px] px-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={onFinish}>{loadingCreate ? renderloading() : 'Nhận đơn'}</button>
      </div>
    </div>
  );
  const renderBody = () => (
    <div className="py-[40px] flex w-[100%] justify-around">
      <div className="w-[450px] h-[450px] flex bg-hover items-center rounded-[20px] shadow-md overflow-hidden">
        <Image width={"100%"} height={"auto"} src={item.img} />
      </div>
      <div className="flex w-[700px] justify-between">
        {renderProfileNFT()}
      </div>
    </div>)
  return (
    <ShowLayout chidren={renderBody()} title="Nhận đơn hàng" />
  );
};

export default Ship;

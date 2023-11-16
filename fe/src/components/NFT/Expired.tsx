import React from "react";
import { Image, Spin } from "antd";
import { CiClock1 } from "react-icons/ci";
import { useSelector } from "react-redux";
import { IStateRedux, createMarketSale, setAccountSearch, setLoading, store } from "../../redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import More from "./More";
import { dateFormat } from "../../ultis";
import { DateFormatType } from "../../interfaces/IRouter";

const Expired: React.FC = () => {
  const { item, loading, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!item) {
      navigate("/");
    }
    store.dispatch(setLoading(false));
  }, []);
  const handleBuy = async () => {
    await store.dispatch(createMarketSale(item));
    navigate("/");
  };
  const handleClick = (wallet: string) => () => {
    if (account && account.wallet === wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 21 }} spin />;
  const renderloading = () => (
    <div className="w-[500px] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );
  return (
    <div className="mt-[20px] w-[100%] border-border border-[1px] shadow-md rounded-[20px] overflow-hidden">
      <p className="w-[100%] text-[25px] flex justify-center items-center border-border border-b-[1px] p-[20px]">
        NFT hết hạn bán
      </p>
      <div className="py-[40px] flex w-[100%] justify-around">
        <div className="w-[500px] h-[500px] rounded-[20px] shadow-md overflow-hidden">
          <Image width={"100%"} height={500} src={item.img} />
        </div>
        <div className="w-[700px] rounded-[20px] flex flex-col justify-between">
          <div>
            <p className="mt-[5px] mb-[10px] text-[35px] w-[700px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
              {item.title.toUpperCase()}
            </p>
            <p>
              Chủ sở hữu hiện tại:{" "}
              <button onClick={handleClick(item.seller)} className="text-settingChoose cursor-pointer underline">{item.seller}</button>
            </p>
            <div className="flex items-center pt-[15px]">
              Ngày bắt đầu bán: {item.date}
            </div>
            <p className="py-[5px]">Số lần đã bán: {item.number}</p>
            <More />
          </div>
          <div className="border-border border-[1px] py-[30px] rounded-[20px] w-[100%] shadow-md">
            <p className="flex items-center border-border px-[30px] pb-[30px] border-b-[1px] w-[100%]">
              <div className="pr-[10px]">
                <CiClock1 />
              </div>{" "}
              Thời gian hết hạn bán NFT: {dateFormat(
                new Date(item.expired),
                DateFormatType.FullDate
              )}
            </p>
            <div className="w-[100%]">
              <p className="py-[20px] text-[30px] flex justify-center">
                Giá bán: {item.price} BNBT
              </p>
              <div className="flex w-[100%] justify-around">
                <button
                  onClick={handleBuy}
                  disabled={loading}
                  className={
                    loading
                      ? "border-border border-[1px] mx-[50px] py-[20px] w-[100%] flex justify-center items-center rounded-[20px] shadow-md cursor-not-allowed"
                      : "border-border border-[1px] mx-[50px] py-[20px] w-[100%] flex justify-center items-center rounded-[20px] shadow-md hover:shadow-xl hover:bg-hover"
                  }>
                  {loading ? renderloading() : "Thu hồi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expired;

import React from "react";
import { Button, Form, Image, Spin } from "antd";
import { useSelector } from "react-redux";
import { IStateRedux, deleteMarketSale, setAccountSearch, setLoading, store } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import More from "./More";
import { dateFormat } from "../../ultis";
import { DateFormatType } from "../../interfaces/IRouter";
import ShowLayout from "../../layouts/ShowLayout";
import TextArea from "antd/es/input/TextArea";

const ExpiredNFT: React.FC = () => {
  const { loading, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  const navigate = useNavigate();
  const localtion = useLocation();
  const item = localtion.state;
  React.useEffect(() => {
    store.dispatch(setLoading(false));
  }, []);
  const handleClick = (wallet: string) => () => {
    if (account && account.wallet === wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };
  const onFinish = async (values: any) => {
    await store.dispatch(deleteMarketSale({ ...item, description: values.description }));
    navigate("/");
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
  const renderloading = () => (
    <div className="w-[55px] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );
  const renderBody = () => (<div className="py-[40px] flex w-[100%] justify-around">
    <div className="w-[450px] h-[450px] flex bg-hover items-center rounded-[20px] shadow-md overflow-hidden">
      <Image width={"100%"} height={"auto"} src={item.img} />
    </div>
    <div className="w-[700px] rounded-[20px] flex flex-col justify-between">
      <div>
        <p className="mt-[5px] mb-[10px] text-[35px] w-[700px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {item.title.toUpperCase()}
        </p>
        <p>
          Người bán:{" "}
          <button onClick={handleClick(item.seller)} className="text-settingChoose cursor-pointer underline">{item.seller}(Bạn)</button>
        </p>
        <p className="py-[5px]">Giá sản phẩm: {item.price} BNBT</p>
        <div className="flex items-center pt-[15px] pb-[5px]">
          Ngày bắt đầu bán: {item.date}
        </div>
        <p className="py-[5px]">Thời gian hết hạn bán sản phẩm: {dateFormat(
          new Date(item.expired),
          DateFormatType.FullDate
        )}</p>

        <More items={item} />
      </div>
      {item.expired > new Date() ?
        <Form
          name="account"
          layout="vertical"
          wrapperCol={{ flex: 1 }}
          colon={false}
          onFinish={onFinish}
        >
          <Form.Item
            label="Mô tả:"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea rows={4} style={{ width: "500px" }} allowClear placeholder="Nhập mô tả..." />
          </Form.Item>
          <Form.Item label=" ">
            <Button htmlType="submit" disabled={loading}>
              {loading ? renderloading() : "Thu hồi"}
            </Button>
          </Form.Item>
        </Form> :
        <div className="items-center pt-[15px] pb-[5px]">
          <p className="py-[15px]">Lý do: hết hạn bán</p>
          <Button disabled={loading} onClick={() => onFinish({ description: "Hết hạn" })}>
            {loading ? renderloading() : "Thu hồi"}
          </Button>
        </div>
      }
    </div >
  </div >)
  return (
    <ShowLayout title="Thu hồi" chidren={renderBody()} />
  );
};

export default ExpiredNFT;

import React from "react";
import { Button, DatePicker, Form, Image, Input, Spin, TimePicker } from "antd";
import { useSelector } from "react-redux";
import { IStateRedux, resellToken, store } from "../../redux";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { getDate, removeUnnecessaryWhiteSpace } from "../../ultis";

const ResellNFT: React.FC = () => {
  const { item, loading } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  const navigate = useNavigate();
  const dateFormat = "YYYY/MM/DD";
  const timeFormate = "hh:mm:ss";
  React.useEffect(() => {
    if (!item) {
      navigate("/");
    }
  }, []);
  const onFinish = async (values: any) => {
    await store.dispatch(
      resellToken({
        tokenId: item.tokenId,
        name: removeUnnecessaryWhiteSpace(values.title),
        price: removeUnnecessaryWhiteSpace(values.price),
        date: getDate(new Date(values.date), new Date(values.time)),
      })
    );
    navigate("/");
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
  const renderloading = () => (
    <div className="w-[60px] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );
  const renderProfileNFT = () => (
    <div className="w-[300px] rounded-[20px] flex flex-col">
      <p className="mt-[5px] mb-[10px] text-[35px] w-[300px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {item.title.toUpperCase()}
      </p>
      <div className="flex items-center pt-[15px] py-[5px]">
        Ngày mua: {item.date}
      </div>
      <div className="py-[5px]">Giá mua: {item.price} ETH</div>
      <p className="py-[5px]">Số lần đã bán: {item.number}</p>
    </div>
  );
  const renderResell = () => (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      onFinish={onFinish}
      className="flex flex-col w-[300px] items-center">
      <div className="flex w-[100%] justify-between">
        <div className="flex flex-col w-[300px]">
          <Form.Item
            label="Tên mới NFT:"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên mới" }]}>
            <Input placeholder="Nhập tên NFT..." />
          </Form.Item>
          <Form.Item
            label="Giá bán mới NFT:"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá bán mới" }]}>
            <Input placeholder="Nhập giá bán NFT..." />
          </Form.Item>
          <Form.Item
            label="Ngày hết hạn bán NFT:"
            name="date"
            rules={[
              { required: true, message: "Vui lòng nhập ngày hết hạn bán mới" },
            ]}>
            <DatePicker format={dateFormat} placeholder="Chọn ngày" />
          </Form.Item>
          <Form.Item
            label="Giờ hết hạn bán NFT:"
            name="time"
            rules={[
              { required: true, message: "Vui lòng nhập giờ hết hạn bán mới" },
            ]}>
            <TimePicker format={timeFormate} placeholder="Chọn giờ" />
          </Form.Item>
          <Form.Item label=" ">
            <Button htmlType="submit" disabled={loading}>
              {loading ? renderloading() : "Bán lại NFT"}
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
  return (
    <div className="mt-[20px] w-[100%] border-border border-[1px] shadow-md rounded-[20px] overflow-hidden">
      <p className="w-[100%] text-[25px] flex justify-center items-center border-border border-b-[1px] p-[20px]">
        Bán lại NFT
      </p>
      <div className="py-[50px] flex w-[100%] justify-around">
        <div className="w-[500px] h-[500px] rounded-[20px] shadow-md overflow-hidden">
          <Image width={"100%"} height={500} src={item.img} />
        </div>
        <div className="flex w-[700px] justify-between">
          {renderProfileNFT()}
          {renderResell()}
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;

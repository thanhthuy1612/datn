import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Image, InputNumber, Modal, Select, Spin } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DateFormatType } from "../../interfaces/IRouter";
import ShowLayout from "../../layouts/ShowLayout";
import { IStateRedux, resellToken, setAccountSearch, setLoading, store } from "../../redux";
import { dateFormat, defaultAddress, getDateTime, removeUnnecessaryWhiteSpace } from "../../ultis";
import { listDescription } from "../../ultis/description";
import More from "./More";

const DoneSell: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const localtion = useLocation();
  const item = localtion.state;

  const navigate = useNavigate();
  const { loadingCreate, account, loading } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };

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

  const onFinish = async (values: any) => {
    await store.dispatch(
      resellToken({
        tokenId: item.tokenId,
        name: item.title,
        price: values.price,
        date: getDateTime(new Date(values.date)),
        description: removeUnnecessaryWhiteSpace(values.description),
        from: "",
        kg: item.kg,
        item: item,
        number: 4
      })
    );
    navigate("/");
  };

  const renderResell = () => (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      onFinish={onFinish}
      form={form}
      className="flex flex-col w-[800px] items-start">
      <Form.Item
        label="Giá bán sản phẩm:"
        name="price"
        tooltip={{ title: 'Đơn vị : BNBT', icon: <InfoCircleOutlined /> }}
        rules={[{ required: true, message: "Vui lòng nhập giá bán mới" }]}>
        <InputNumber min={0.01} step={0.01} className="w-[500px]" placeholder="Nhập giá bán sản phẩm..." />
      </Form.Item>
      <Form.Item
        label="Thời gian hết hạn bán sản phẩm:"
        name="date"
        rules={[
          { required: true, message: "Vui lòng chọn thời gian hết hạn" },
        ]}>
        <DatePicker disabledDate={(current) => {
          const customDate = moment();
          return current && current < moment(customDate);
        }} className="w-[500px]" showTime placeholder="Chọn thời gian" />
      </Form.Item>
      <Form.Item
        label="Trạng thái sản phẩm:"
        name="description"
        className="w-[500px]"
        rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
      >
        <Select placeholder="Trạng thái sản phẩm">
          {listDescription.map((item) => (<Select.Option key={item?.id} value={item?.name}>{item?.name}</Select.Option>))}
        </Select>
      </Form.Item>
      <Form.Item label=" ">
        <Button htmlType="submit" disabled={loading}>
          {loading ? renderloading() : "Đăng bán"}
        </Button>
      </Form.Item>
    </Form>
  );

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
        <div className="flex items-center pt-[5px]">
          Ngày cập nhật: {item.date}
        </div>
        <div className="flex items-center pt-[5px]">
          Ngày hết hạn sản phẩm: {dateFormat(
            new Date(item.expired),
            DateFormatType.FullDate
          )}</div>
        {item.kg && <div className="flex items-center pt-[5px]">Còn: {item.kg / 1000} kg</div>}
        <div className="flex items-center pt-[15px] py-[5px] mb-[20px]">
          Mô tả: {item.description}
        </div>
        <div className="py-[5px] text-[20px]">Giá sản phẩm: {item.price} BNBT</div>
        <More items={item} />
      </div>
      <div className="flex mt-[50px]">
        <button disabled={loadingCreate} className="border-boder border-[1px] rounded-[10px] py-[15px] px-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={showModal}>Đăng bán</button>
        <Modal width={800} title="Đăng bán" open={isModalOpen} onCancel={handleCancel} footer={null}>
          {renderResell()}
        </Modal>
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
    <ShowLayout chidren={renderBody()} title="Đăng bán" />
  );
};

export default DoneSell;

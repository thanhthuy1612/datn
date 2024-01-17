import React from "react";
import { Button, DatePicker, Form, Image, Input, InputNumber, Modal, Select, Spin, TimePicker } from "antd";
import { IStateRedux, resellToken, setAccountSearch, setLoading, store } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import More from "./More";
import ShowLayout from "../../layouts/ShowLayout";
import { useSelector } from "react-redux";
import { dateFormat, defaultAddress, getDate, removeUnnecessaryWhiteSpace } from "../../ultis";
import { DateFormatType } from "../../interfaces/IRouter";
import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { listDescription } from "../../ultis/description";

const DoneSell: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const localtion = useLocation();
  const item = localtion.state;

  const dateFormatForm = "YYYY/MM/DD";
  const timeFormateForm = "hh:mm:ss";

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
        price: removeUnnecessaryWhiteSpace(values.price),
        date: getDate(new Date(values.date), new Date(values.time)),
        description: `${removeUnnecessaryWhiteSpace(values.description)} - ${values.number} ${removeUnnecessaryWhiteSpace(values.kg)}`,
        from: "",
        item: item
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
      className="flex flex-col w-[300px] items-center">
      <div className="flex w-[100%] justify-between">
        <div className="flex flex-col w-[300px]">
          <Form.Item
            label="Giá bán sản phẩm:"
            name="price"
            tooltip={{ title: 'Đơn vị : BNBT', icon: <InfoCircleOutlined /> }}
            rules={[{ required: true, message: "Vui lòng nhập giá bán mới" }]}>
            <Input placeholder="Nhập giá bán sản phẩm..." />
          </Form.Item>
          <Form.Item
            label="Ngày hết hạn bán sản phẩm:"
            name="date"
            rules={[
              { required: true, message: "Vui lòng nhập ngày hết hạn bán mới" },
            ]}>
            <DatePicker  format={dateFormatForm} placeholder="Chọn ngày" />
          </Form.Item>
          <Form.Item
            label="Giờ hết hạn bán sản phẩm:"
            name="time"
            tooltip={{ title: 'Lớn hơn giờ hiện tại ít nhất 2 phút', icon: <InfoCircleOutlined /> }}
            rules={[
              { required: true, message: "Vui lòng nhập giờ hết hạn bán mới" },
            ]}>
            <TimePicker format={timeFormateForm} placeholder="Chọn giờ" />
          </Form.Item>
          <Form.Item
            label="Trạng thái sản phẩm:"
            name="description"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
          >
            <Select placeholder="Trạng thái sản phẩm">
              {listDescription.map((item) => (<Select.Option value={item?.name}>{item?.name}</Select.Option>))}
            </Select>
          </Form.Item>
          <div className="flex w-[800px]">
            <Form.Item
              label="Số lượng sản phẩm:"
              name="number"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
            >
              <InputNumber className="w-[300px] mr-[20px]" placeholder="Nhập số lượng sản phẩm" />
            </Form.Item>
            <Form.Item
              label="Định lượng sản phẩm:"
              name="kg"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
            >
              <Select placeholder="Định lượng">
                <Select.Option value="gam">GAM</Select.Option>
                <Select.Option value="kg">KG</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label=" ">
            <Button htmlType="submit" disabled={loading}>
              {loading ? renderloading() : "Bán sản phẩm"}
            </Button>
          </Form.Item>
        </div>
      </div>
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
        <div className="flex items-center pt-[15px] py-[5px] mb-[20px]">
          Mô tả: {item.description}
        </div>
        <div className="py-[5px] text-[20px]">Giá sản phẩm: {item.price} BNBT</div>
        <More />
      </div>
      <div className="flex mt-[50px]">
        <button disabled={loadingCreate} className="border-boder border-[1px] rounded-[10px] py-[15px] px-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={showModal}>Bán sản phẩm</button>
        <Modal width={800} title="Bán sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
          {renderResell()}
        </Modal>
      </div>
    </div>
  );
  const renderBody = () => (
    <div className="py-[40px] flex w-[100%] justify-around">
      <div className="w-[450px] h-[450px] rounded-[20px] shadow-md overflow-hidden">
        <Image width={"100%"} height={500} src={item.img} />
      </div>
      <div className="flex w-[700px] justify-between">
        {renderProfileNFT()}
      </div>
    </div>)
  return (
    <ShowLayout chidren={renderBody()} title="Bán sản phẩm" />
  );
};

export default DoneSell;

import React from "react";
import { Button, DatePicker, Form, Image, Input, InputNumber, Modal, Radio, RadioChangeEvent, Select, Space, Spin, TimePicker, Upload, UploadFile } from "antd";
import { useSelector } from "react-redux";
import { IStateRedux, changeTokenUri, resellToken, setLoading, store } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { getDate, removeUnnecessaryWhiteSpace } from "../../ultis";
import More from "./More";
import { postPicture } from "../../api";
import { RcFile, UploadProps } from "antd/es/upload";
import ShowLayout from "../../layouts/ShowLayout";
import { listDescription } from "../../ultis/description";

interface IState {
  previewOpenNFT: boolean;
  previewImageNFT: string;
  previewTitleNFT: string;
}

const ResellNFT: React.FC = () => {
  const [isModalOpenAdd, setIsModalOpenAdd] = React.useState<boolean>(false);
  const [isModalOpenCreate, setIsModalOpenCreate] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>();
  const [input, setInput] = React.useState<string>('');
  const [file, setFile] = React.useState<string>("");
  const [img, setImg] = React.useState<UploadFile[]>([]);
  const [state, _setState] = React.useState<IState>({
    previewOpenNFT: false,
    previewImageNFT: "",
    previewTitleNFT: "",
  });
  const [form] = Form.useForm();
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const { loading, loadingCreate, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const localtion = useLocation();
  const item = localtion.state;

  const navigate = useNavigate();
  const dateFormat = "YYYY/MM/DD";
  const timeFormate = "hh:mm:ss";

  React.useEffect(() => {
    store.dispatch(setLoading(false));
  }, []);

  const upload = async (file: File) => {
    const input = new FormData();
    input.append("file", file);
    const result: any = await postPicture(input);
    setFile(result.data.Hash);
    return result;
  };

  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const showModalCreate = () => {
    setIsModalOpenCreate(true);
    form.resetFields()
  };

  const handleCancelCreate = () => {
    setIsModalOpenCreate(false);
    form.resetFields()
  };

  const action = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      const result = await upload(file);
      onSuccess(result);
    } catch (error) {
      onError({ event: error });
      console.log("Error uploading file: ", error);
    }
  };

  const onFinish = async (values: any) => {
    await store.dispatch(
      resellToken({
        tokenId: item.tokenId,
        name: item.title,
        price: removeUnnecessaryWhiteSpace(values.price),
        date: getDate(new Date(values.date), new Date(values.time)),
        description: `${removeUnnecessaryWhiteSpace(values.description)} - ${values.number} ${removeUnnecessaryWhiteSpace(values.kg)}`,
        from: value === 1 ? account?.address : removeUnnecessaryWhiteSpace(input),
        item: item
      })
    );
    navigate("/");
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinishAdd = async (value: any) => {
    await store.dispatch(
      changeTokenUri({
        tokenId: item.tokenId,
        file: file,
        description: removeUnnecessaryWhiteSpace(value.description)
      })
    );
    navigate("/");
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setImg(newFileList)
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setState({
      previewOpenNFT: true,
      previewImageNFT: file.url || (file.preview as string),
      previewTitleNFT:
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    });
  };
  const handleCancel = () => setState({ previewOpenNFT: false });
  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
  const renderloading = () => (
    <div className="w-[100%] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );
  const renderAdd = () => (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      onFinish={onFinishAdd}
      className="flex flex-col w-[100%] mx-[50px]"
      form={form}
    >
      <div className="flex">
        <div className="w-[300px] h-[300px]">
          <Form.Item
            label="Trạng thái mới nhất của sản phẩm:"
            name="img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng thêm" }]}
          >
            <Upload
              accept="image/*"
              customRequest={action}
              listType="picture-card"
              fileList={img}
              onChange={onChange}
              onPreview={onPreview}
            >
              {img.length === 0 && "+ Thêm file"}
            </Upload>
          </Form.Item>
        </div>
        <Form.Item
          label="Trạng thái sản phẩm:"
          name="description"
          className="w-[400px]"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
        >
          <Select placeholder="Trạng thái sản phẩm">
            {listDescription.map((item) => (<Select.Option value={item?.name}>{item?.name}</Select.Option>))}
          </Select>
        </Form.Item>
      </div>
      <Form.Item label=" ">
        <Button htmlType="submit" disabled={loadingCreate}>
          {loadingCreate ? renderloading() : "Xác nhận"}
        </Button>
      </Form.Item>
      <Modal
        open={state.previewOpenNFT}
        title={state.previewTitleNFT}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{ width: "100%" }}
          src={state.previewImageNFT}
        />
      </Modal>
    </Form>
  )
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
        <div className="flex flex-col w-[500px]">
          <Form.Item
            label="Địa chỉ sản phẩm:"
            name="address"
            rules={[{ required: true, message: "Vui lòng chọn loại địa chỉ" }]}>
            <Radio.Group onChange={onChangeRadio} value={value}>
              <Space direction="vertical">
                <Radio className="w-[500px]" value={1} disabled={!account?.address}>
                  Địa chỉ mặc định: {" "}
                  {account?.address ?? 'Không có dữ liệu'}
                </Radio>
                <Radio value={2}><div className="flex items-center">
                  <p className="w-[150px]">Địa chỉ khác:</p>
                  {value === 2 && <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập tên sản phẩm..." />}</div></Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <button onClick={() => { navigate('/setting') }} className="flex underline italic cursor-pointer text-settingChoose">Chỉnh sửa địa chỉ mặc định</button>
          <Form.Item
            label="Giá bán sản phẩm:"
            name="price"
            tooltip={{ title: 'Đơn vị : BNBT', icon: <InfoCircleOutlined /> }}
            rules={[{ required: true, message: "Vui lòng nhập giá bán" }]}>
            <Input placeholder="Nhập giá bán sản phẩm..." />
          </Form.Item>
          <Form.Item
            label="Ngày hết hạn bán sản phẩm:"
            name="date"
            rules={[
              { required: true, message: "Vui lòng nhập ngày hết hạn bán mới" },
            ]}>
            <DatePicker format={dateFormat} placeholder="Chọn ngày" />
          </Form.Item>
          <Form.Item
            label="Giờ hết hạn bán sản phẩm:"
            name="time"
            tooltip={{ title: 'Lớn hơn giờ hiện tại ít nhất 2 phút', icon: <InfoCircleOutlined /> }}
            rules={[
              { required: true, message: "Vui lòng nhập giờ hết hạn bán mới" },
            ]}>
            <TimePicker format={timeFormate} placeholder="Chọn giờ" />
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
          <div className="flex w-[100%]">
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
  const renderProfileNFT = () => (
    <div className="rounded-[20px] flex flex-col justify-between pb-[60px]">
      <div className="rounded-[20px] flex flex-col">
        <p className="mt-[5px] mb-[10px] text-[35px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {item.title.toUpperCase()}
        </p>
        <div className="flex items-center pt-[15px] py-[5px]">
          Ngày tạo: {item.date}
        </div>
        <div className="flex items-center pt-[15px] py-[5px] mb-[20px]">
          Mô tả: {item.description}
        </div>
        {item.price > 0 && <div className="py-[5px]">Giá mua: {item.price} BNBT</div>}
        <More />
      </div>
      <div className="flex mt-[50px]">
        <button className="border-boder border-[1px] rounded-[10px] py-[15px] px-[30px] mr-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={showModalAdd}>Thêm tình trạng hiện tại</button>
        <Modal width={800} title="Cập nhật sản phẩm" open={isModalOpenAdd} onCancel={handleCancelAdd} footer={null}>
          {renderAdd()}
        </Modal>
        <button className="border-boder border-[1px] rounded-[10px] py-[15px] px-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={showModalCreate}>Bán sản phẩm</button>
        <Modal width={800} title="Bán sản phẩm" open={isModalOpenCreate} onCancel={handleCancelCreate} footer={null}>
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

export default ResellNFT;

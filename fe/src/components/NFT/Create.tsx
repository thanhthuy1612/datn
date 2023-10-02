import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Spin,
  TimePicker,
  Upload,
  UploadFile,
} from "antd";
import React from "react";
import { postPicture } from "../../api";
import { RcFile, UploadProps } from "antd/es/upload";
import { getDate, removeUnnecessaryWhiteSpace } from "../../ultis";
import "./create.css";
import { IStateRedux, createToken, store } from "../../redux";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface IState {
  img: UploadFile[];
  file: string;
  previewOpenNFT: boolean;
  previewImageNFT: string;
  previewTitleNFT: string;
}
const Create: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    img: [],
    file: "",
    previewOpenNFT: false,
    previewImageNFT: "",
    previewTitleNFT: "",
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const navigate = useNavigate();

  const { loadingCreate } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const dateFormat = "YYYY/MM/DD";
  const timeFormate = "hh:mm:ss";

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const upload = async (file: File) => {
    const input = new FormData();
    input.append("file", file);
    const result: any = await postPicture(input);
    setState({ file: result.data.Hash });
    return result;
  };
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setState({
      img: newFileList,
    });
  };

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
      createToken({
        name: removeUnnecessaryWhiteSpace(values.title),
        price: removeUnnecessaryWhiteSpace(values.price),
        number: values.number ?? 3,
        file: state.file,
        date: getDate(new Date(values.date), new Date(values.time)),
      })
    );
    navigate("/");
  };

  const handleCancel = () => setState({ previewOpenNFT: false });
  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
  const renderloading = () => (
    <div className="w-[55px] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );

  return (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      onFinish={onFinish}
      className="flex flex-col w-[100%] items-center">
      <div className="flex w-[100%] justify-between">
        <div className="flex flex-col w-[550px]">
          <Form.Item
            label="Tên NFT:"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tên NFT" }]}>
            <Input placeholder="Nhập tên NFT..." />
          </Form.Item>
          <Form.Item
            label="Giá bán NFT:"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá bán NFT" }]}>
            <Input placeholder="Nhập giá bán NFT..." />
          </Form.Item>
          <Form.Item
            label="Ngày hết hạn bán NFT:"
            name="date"
            rules={[
              { required: true, message: "Vui lòng nhập ngày hết hạn bán NFT" },
            ]}>
            <DatePicker format={dateFormat} placeholder="Chọn ngày" />
          </Form.Item>
          <Form.Item
            label="Giờ hết hạn bán NFT:"
            name="time"
            rules={[
              { required: true, message: "Vui lòng nhập giờ hết hạn bán NFT" },
            ]}>
            <TimePicker format={timeFormate} placeholder="Chọn giờ" />
          </Form.Item>
          <Form.Item label="Số lần mua bán:" name="number">
            <InputNumber min={1} max={10} defaultValue={3} />
          </Form.Item>
          <Form.Item label=" ">
            <Button htmlType="submit" disabled={loadingCreate}>
              {loadingCreate ? renderloading() : "Thêm NFT"}
            </Button>
          </Form.Item>
        </div>
        <div className="flex justify-center w-[300px] h-[300px]">
          <Form.Item
            label="NFT mới:"
            name="img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng thêm NFT" }]}>
            <Upload
              accept="image/*"
              customRequest={action}
              listType="picture-card"
              fileList={state.img}
              onChange={onChange}
              onPreview={onPreview}>
              {state.img.length === 0 && "+ Thêm file"}
            </Upload>
          </Form.Item>
        </div>
      </div>
      <Modal
        open={state.previewOpenNFT}
        title={state.previewTitleNFT}
        footer={null}
        onCancel={handleCancel}>
        <img
          alt="example"
          style={{ width: "100%" }}
          src={state.previewImageNFT}
        />
      </Modal>
    </Form>
  );
};

export default Create;

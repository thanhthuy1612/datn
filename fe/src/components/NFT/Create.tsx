import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  TimePicker,
  Upload,
  UploadFile,
} from "antd";
import React from "react";
import { postPicture } from "../../api";
import { RcFile, UploadProps } from "antd/es/upload";
import { removeUnnecessaryWhiteSpace } from "../../ultis";
import "./create.css";

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

  const dateFormat = "YYYY/MM/DD";
  const timeFormate = "hh:mm:ss";

  const upload = async (file: File) => {
    const input = new FormData();
    input.append("file", file);
    const result: any = await postPicture(input);
    setState({ file: `https://ipfs.io/ipfs/${result.data.Hash}` });
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
    console.log({
      title: removeUnnecessaryWhiteSpace(values.title),
      price: removeUnnecessaryWhiteSpace(values.price),
      date: values.date,
    });
  };

  const handleCancel = () => setState({ previewOpenNFT: false });

  return (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      onFinish={onFinish}
      className="flex flex-col w-[100%] items-center">
      <div className="flex w-[100%] justify-between">
        <div className="flex flex-col pr-[50px]">
          <Form.Item label="NFT mới:">
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
        <div className="flex flex-col w-[550px]">
          <Form.Item label="Tên NFT:" name="title">
            <Input placeholder="Nhập tên NFT..." />
          </Form.Item>
          <Form.Item label="Giá bán NFT:" name="price">
            <Input placeholder="Nhập giá bán NFT..." />
          </Form.Item>
          <Form.Item label="Ngày hết hạn bán NFT:" name="date">
            <DatePicker format={dateFormat} placeholder="Chọn ngày" />
          </Form.Item>
          <Form.Item label="Giờ hết hạn bán NFT:" name="time">
            <TimePicker format={timeFormate} placeholder="Chọn giờ" />
          </Form.Item>
          <Form.Item label="Số lần mua bán:" name="number">
            <InputNumber min={1} max={10} defaultValue={3} />
          </Form.Item>
          <Form.Item label=" ">
            <Button htmlType="submit">Thêm NFT</Button>
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

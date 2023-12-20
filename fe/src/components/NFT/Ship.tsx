import React from "react";
import { Button, Form, Image, Input, Modal, Spin, Upload, UploadFile } from "antd";
import { useSelector } from "react-redux";
import { IStateRedux, setLoading, shipMarketSale, store } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { removeUnnecessaryWhiteSpace } from "../../ultis";
import More from "./More";
import { postPicture } from "../../api";
import { RcFile, UploadProps } from "antd/es/upload";
import ShowLayout from "../../layouts/ShowLayout";

interface IState {
  previewOpenNFT: boolean;
  previewImageNFT: string;
  previewTitleNFT: string;
}

const Ship: React.FC = () => {
  const [isModalOpenCreate, setIsModalOpenCreate] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<string>("");
  const [img, setImg] = React.useState<UploadFile[]>([]);
  const [state, _setState] = React.useState<IState>({
    previewOpenNFT: false,
    previewImageNFT: "",
    previewTitleNFT: "",
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const { loadingCreate } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const localtion = useLocation();
  const item = localtion.state;
  const { TextArea } = Input;

  const navigate = useNavigate();

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

  const showModalCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handleCancelCreate = () => {
    setIsModalOpenCreate(false);
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

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinishAdd = async (value: any) => {
    await store.dispatch(
      shipMarketSale({
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
    <div className="w-[60px] flex justify-center items-center">
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
          label="Mô tả:"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <TextArea rows={4} style={{ width: "500px" }} allowClear placeholder="Nhập mô tả..." />
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
        <button className="border-boder border-[1px] rounded-[10px] py-[15px] px-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={showModalCreate}>Giao hàng</button>
        <Modal width={1000} title="Giao hàng" open={isModalOpenCreate} onCancel={handleCancelCreate} footer={null}>
          {renderAdd()}
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
    <ShowLayout chidren={renderBody()} title="Nhận đơn hàng" />
  );
};

export default Ship;

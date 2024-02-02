import { Button, Form, Input, Modal, Select, Spin, Upload, UploadFile } from "antd";
import React from "react";
import { postPicture } from "../../api";
import { RcFile, UploadProps } from "antd/es/upload";
import { removeUnnecessaryWhiteSpace } from "../../ultis";
import { IStateRedux, createToken, setLoading, store } from "../../redux";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../interfaces/IRouter";
import { getProductsByAccount } from "../../api/product";
import { listDescription } from "../../ultis/description";
interface IState {
  img: UploadFile[];
  file: string;
  previewOpenNFT: boolean;
  previewImageNFT: string;
  previewTitleNFT: string;
  listProduct: IProduct[];
  isLoading: boolean
}
const Create: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    img: [],
    file: "",
    previewOpenNFT: false,
    previewImageNFT: "",
    previewTitleNFT: "",
    listProduct: [],
    isLoading: true
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const navigate = useNavigate();
  const { loadingCreate, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  const [form] = Form.useForm();

  const fetch = React.useCallback(async () => {
    setState({ isLoading: true });
    const result = await getProductsByAccount(account?.wallet ?? '');
    setState({ listProduct: result ?? [], isLoading: false });
  }, [account?.wallet])

  React.useEffect(() => {
    store.dispatch(setLoading(false));
    fetch()
  }, [fetch])

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
    } catch (err) {
      onError({ event: err });
    }
  };

  const onFinish = async (values: any) => {
    await store.dispatch(
      createToken({
        name: `${removeUnnecessaryWhiteSpace(values.title)}-${removeUnnecessaryWhiteSpace(values.hash)}`,
        file: state.file,
        description: removeUnnecessaryWhiteSpace(values.description),
        kg: 0
      })
    );
    navigate("/");
  };

  const handleCancel = () => {
    setState({ previewOpenNFT: false });
  }
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
      className="flex flex-col w-[100%] items-center"
      form={form}
    >
      <div className="flex w-[100%] justify-between">
        <div className="flex justify-center w-[300px] h-[300px]">
          <Form.Item
            label="Hình ảnh sản phẩm:"
            name="img"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh sản phẩm" }]}
          >
            <Upload
              accept="image/*"
              customRequest={action}
              listType="picture-card"
              fileList={state.img}
              onChange={onChange}
              onPreview={onPreview}
            >
              {state.img.length === 0 && "+ Thêm file"}
            </Upload>
          </Form.Item>
        </div>
        <div className="flex flex-col w-[550px]">
          <Form.Item
            label="Loại sản phẩm:"
            name="title"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
          >
            <Select placeholder="Loại sản phẩm">
              {state.listProduct.map((item) => (<Select.Option value={item?.name}>{item?.name}</Select.Option>))}
            </Select>
          </Form.Item>
          <button onClick={() => { navigate('/collection') }} className="flex underline italic cursor-pointer text-settingChoose">Chỉnh sửa danh sách nông sản</button>
          <Form.Item
            label="Mã sản phẩm:"
            name="hash"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm" }]}
          >
            <Input placeholder="Nhập mã sản phẩm" />
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
          <Form.Item label=" ">
            <Button htmlType="submit" disabled={loadingCreate}>
              {loadingCreate ? renderloading() : "Thêm sản phẩm"}
            </Button>
          </Form.Item>
        </div>
      </div>
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
  );
};

export default Create;

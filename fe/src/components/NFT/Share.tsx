import React from "react";
import { Button, Form, Image, InputNumber, Modal, Select, Spin, Upload, UploadFile, UploadProps } from "antd";
import { IStateRedux, createTokenNew, setAccountSearch, setLoading, store } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import More from "./More";
import ShowLayout from "../../layouts/ShowLayout";
import { useSelector } from "react-redux";
import { dateFormat, defaultAddress, removeUnnecessaryWhiteSpace } from "../../ultis";
import { DateFormatType } from "../../interfaces/IRouter";
import { LoadingOutlined } from "@ant-design/icons";
import { IKG, listDescriptionAction } from "../../ultis/description";
import { RcFile } from "antd/es/upload";
import { postPicture } from "../../api";

interface IState {
  img: UploadFile[];
  file: string;
  previewOpenNFT: boolean;
  previewImageNFT: string;
  previewTitleNFT: string;
  isLoading: boolean;
  isModalOpen: boolean;
}

const ShareNFT: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    img: [],
    file: "",
    previewOpenNFT: false,
    previewImageNFT: "",
    previewTitleNFT: "",
    isLoading: true,
    isModalOpen: false
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const [value, setValue] = React.useState<IKG>(IKG.none);
  const [form] = Form.useForm();
  const localtion = useLocation();
  const item = localtion.state;

  const navigate = useNavigate();
  const { loadingCreate, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const showModal = () => {
    setState({ isModalOpen: true })
    setValue(IKG.none)
  };

  const handleCancel = () => {
    setState({ isModalOpen: false })
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

  const getKg = (value: number, kg: IKG) => {
    switch (kg) {
      case IKG.kg:
        return value * 1000
      case IKG.gam:
        return value
      default:
        return 0
    }
  }

  const onFinish = async (values: any) => {
    await store.dispatch(
      createTokenNew({
        file: state.file,
        kg: getKg(values.number, values.kg),
        description: removeUnnecessaryWhiteSpace(values.description),
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

  const upload = async (file: File) => {
    const input = new FormData();
    input.append("file", file);
    const result: any = await postPicture(input);
    setState({ file: result.data.Hash });
    return result;
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

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setState({
      img: newFileList,
    });
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

  const onChangeSelect = (value: IKG) => {
    setValue(value)
  }

  const getMax = () => {
    switch (value) {
      case IKG.kg:
        return item?.kg / 1000;
      case IKG.gam:
        return item?.kg;
      default:
        return 0
    }
  }
  const renderForm = () => (
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
            rules={[{ required: true, message: "Vui lòng thêm NFT" }]}
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
          <button onClick={() => { navigate('/collection') }} className="flex underline italic cursor-pointer text-settingChoose">Chỉnh sửa danh sách nông sản</button>
          <Form.Item
            label="Số lượng sản phẩm:"
            name="number"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
          >
            <InputNumber disabled={!value} min={1} max={getMax()} className="w-[100%]" placeholder="Nhập số lượng sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Định lượng sản phẩm:"
            name="kg"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
          >
            <Select value={value} onChange={onChangeSelect} placeholder="Định lượng">
              <Select.Option value={IKG.gam}>GAM</Select.Option>
              <Select.Option value={IKG.kg}>KG</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Trạng thái sản phẩm:"
            name="description"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
          >
            <Select placeholder="Trạng thái sản phẩm">
              {listDescriptionAction.map((item) => (<Select.Option key={item.id} value={item?.name}>{item?.name}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item label=" ">
            <Button htmlType="submit" disabled={loadingCreate}>
              {loadingCreate ? renderloading() : "Chia đơn"}
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
        {item.kg && <div className="flex items-center pt-[5px]">Còn: {item.kg / 1000} kg</div>}
        <div className="flex items-center pt-[5px]">
          Ngày cập nhật: {item.date}
        </div>
        <div className="flex items-center pt-[5px]">
          Ngày hết hạn sản phẩm: {dateFormat(
            new Date(item.expired),
            DateFormatType.FullDate
          )}</div>
        <div className="flex items-center pt-[5px]">
          Mô tả: {item.description}
        </div>
        <div className="py-[5px] text-[20px]">Giá nhập sản phẩm: {item.price} BNBT</div>
        <More items={item} />
      </div>
      <div className="flex mt-[30px]">
        <button disabled={loadingCreate} className="border-boder border-[1px] rounded-[10px] py-[15px] px-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={showModal}>Chia đơn</button>
        <Modal width={800} title="Chia đơn" open={state.isModalOpen} onCancel={handleCancel} footer={null}>
          {renderForm()}
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
    <ShowLayout chidren={renderBody()} title="Chia đơn" />
  );
};

export default ShareNFT;

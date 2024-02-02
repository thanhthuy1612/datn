import React from "react";
import { Button, Form, Image, Modal, Select, Spin, Upload, UploadFile } from "antd";
import { useSelector } from "react-redux";
import { IStateRedux, doneShipMarketSale, setAccountSearch, setLoadingCreate, store, updateShip } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { dateFormat, defaultAddress, removeUnnecessaryWhiteSpace } from "../../ultis";
import More from "./More";
import { postPicture } from "../../api";
import { RcFile, UploadProps } from "antd/es/upload";
import ShowLayout from "../../layouts/ShowLayout";
import { DateFormatType } from "../../interfaces/IRouter";
import { listDescriptionKho, listDescriptionShip } from "../../ultis/description";

interface IState {
  previewOpenNFT: boolean;
  previewImageNFT: string;
  previewTitleNFT: string;
}

const DoingShip: React.FC = () => {
  const [isModalOpenAdd, setIsModalOpenAdd] = React.useState<boolean>(false);
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

  const { loadingCreate, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const localtion = useLocation();
  const item = localtion.state;

  const navigate = useNavigate();

  React.useEffect(() => {
    store.dispatch(setLoadingCreate(false));
  }, []);

  const handleClick = (wallet: string) => () => {
    if (account && account.wallet === wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };
  const checkAccount = (wallet: string) => {
    if (wallet === account?.wallet) {
      return '(Bạn)'
    }
    return ""
  }

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

  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };

  const handleCancelCreate = () => {
    setIsModalOpenCreate(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
  };

  const action = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      const result = await upload(file);
      onSuccess(result);
    } catch (err) {
      onError({ event: err});
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinishAdd = async (value: any) => {
    if (isModalOpenAdd) {
      await store.dispatch(
        updateShip({
          tokenId: item.tokenId,
          file: file,
          description: `${removeUnnecessaryWhiteSpace(value.description)} - ${removeUnnecessaryWhiteSpace(value.to)}`
        })
      );
      navigate("/");
    }
    if (isModalOpenCreate) {
      await store.dispatch(
        doneShipMarketSale({
          tokenId: item.tokenId,
          file: file,
          description: `${removeUnnecessaryWhiteSpace(value.description)} - ${removeUnnecessaryWhiteSpace(value.to)}`
        })
      );
      navigate("/");
    }
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
        <div>
          <Form.Item
            label="Trạng thái sản phẩm:"
            name="description"
            className="w-[400px]"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái sản phẩm" }]}
          >
            <Select placeholder="Trạng thái sản phẩm">
              {listDescriptionShip.map((item) => (<Select.Option value={item?.name}>{item?.name}</Select.Option>))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Địa chỉ hiện tại sản phẩm:"
            name="to"
            className="w-[400px]"
            rules={[{ required: true, message: "Vui lòng chọn địa chỉ hiện tại sản phẩm" }]}
          >
            <Select placeholder="Địa chỉ hiện tại sản phẩm">
              {listDescriptionKho.map((item) => (<Select.Option value={item?.name}>{item?.name}</Select.Option>))}
            </Select>
          </Form.Item>
        </div>
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
        {item.seller !== defaultAddress && <div className="flex items-center pt-[5px]">
          Người bán: <button onClick={handleClick(item.seller)} className="text-settingChoose cursor-pointer underline">{item.seller} {checkAccount(item.seller)}</button>
        </div>}
        {item.owner !== defaultAddress && <div className="flex items-center pt-[5px]">
          Người mua: <button onClick={handleClick(item.owner)} className="text-settingChoose cursor-pointer underline">{item.owner} {checkAccount(item.owner)}</button>
        </div>}
        {item.shipper !== defaultAddress && <div className="flex items-center pt-[5px]">
          Người giao hàng: <button onClick={handleClick(item.shipper)} className="text-settingChoose cursor-pointer underline">{item.shipper} {checkAccount(item.shipper)}</button>
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
        <More items={item} />
      </div>
      <div className="flex mt-[50px]">
        <button className="border-boder mr-[20px] border-[1px] rounded-[10px] py-[15px] px-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={showModalAdd}>Cập nhật</button>
        <Modal width={1000} title="Cập nhật sản phẩm" open={isModalOpenAdd} onCancel={handleCancelAdd} footer={null}>
          {renderAdd()}
        </Modal>
        <button className="border-boder border-[1px] rounded-[10px] py-[15px] px-[30px] hover:bg-hover shadow-md hover:shadow-xl" onClick={showModalCreate}>Xác nhận giao hàng</button>
        <Modal width={1000} title="Xác nhận giao hàng" open={isModalOpenCreate} onCancel={handleCancelCreate} footer={null}>
          {renderAdd()}
        </Modal>
      </div>
    </div>
  );
  const renderBody = () => (
    <div className="py-[40px] flex w-[100%] justify-around">
      <div className="w-[450px] h-[450px] flex bg-hover items-center rounded-[20px] shadow-md overflow-hidden">
        <Image width={"100%"} height={"100%"} style={{objectFit: "cover"}} src={item.img} />
      </div>
      <div className="flex w-[700px] justify-between">
        {renderProfileNFT()}
      </div>
    </div>)
  return (
    <ShowLayout chidren={renderBody()} title="Cập nhật giao hàng" />
  );
};

export default DoingShip;

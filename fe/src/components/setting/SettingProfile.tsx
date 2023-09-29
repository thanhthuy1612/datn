import React from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { CiWallet } from "react-icons/ci";
import Tippy from "@tippyjs/react/headless";
import { DateFormatType, IAccount } from "../../interfaces/IRouter";
import { RcFile } from "antd/es/upload";
import { useSelector } from "react-redux";
import { IStateRedux, setAccount, store } from "../../redux";
import { postPicture } from "../../api";
import { uploadPicture } from "../../api/account";
import { dateFormat, removeUnnecessaryWhiteSpace } from "../../ultis";
import { followCursor } from "tippy.js";

interface IState {
  account?: IAccount;
  ava: UploadFile[];
  banner: UploadFile[];
  previewOpen: boolean;
  previewImage: string;
  previewTitle: string;
  visible: boolean;
  alert: boolean;
}

const SettingProfile: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    ava: [],
    banner: [],
    previewOpen: false,
    previewImage: "",
    previewTitle: "",
    visible: false,
    alert: true,
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const { account } = useSelector((state: { item: IStateRedux }) => state.item);

  React.useEffect(() => {
    state.visible &&
      setTimeout(() => {
        setState({ visible: false });
      }, 5000);
  }, [state.visible]);

  const setUpdate = (name: string, value: string | undefined) => {
    const newAccount = structuredClone(state.account);
    setState({
      account: {
        ...newAccount,
        [name]: value,
      },
    });
  };

  const onChangeAva: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length === 0) {
      setUpdate("ava", undefined);
    }
    setState({ ava: newFileList });
  };
  const onChangeBanner: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    if (newFileList.length === 0) {
      setUpdate("banner", undefined);
    }
    setState({ banner: newFileList });
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
      previewImage: file.url ?? (file.preview as string),
      previewOpen: true,
      previewTitle:
        file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1),
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account?.wallet as string);
  };
  const upload = async (name: string, file: File) => {
    const input = new FormData();
    input.append("file", file);
    const result: any = await postPicture(input);
    setUpdate(name, `https://ipfs.io/ipfs/${result.data.Hash}`);
    return result;
  };

  const actionAva = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      const result = await upload("ava", file);
      onSuccess(result);
    } catch (error) {
      onError({ event: error });
      console.log("Error uploading file: ", error);
    }
  };

  const actionBanner = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      const result = await upload("banner", file);
      onSuccess(result);
    } catch (error) {
      onError({ event: error });
      console.log("Error uploading file: ", error);
    }
  };

  const onFinish = async (values: any) => {
    setState({ visible: false });
    const result = await uploadPicture(account?.wallet as string, {
      username: removeUnnecessaryWhiteSpace(values.username),
      bio: removeUnnecessaryWhiteSpace(values.bio),
      email: removeUnnecessaryWhiteSpace(values.email),
      ava: state.account?.ava,
      banner: state.account?.banner,
    });
    await store.dispatch(setAccount(result.data[0]));
    setState({ alert: result.data !== null, visible: true });
  };

  const handleCancel = () => setState({ previewOpen: false });

  return (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      onFinish={onFinish}
      className="flex flex-col w-[100%] relative">
      <div className="flex w-[100%] justify-between">
        <div className="flex flex-col w-[550px]">
          <Form.Item label="Tên người dùng:" name="username">
            <Input placeholder="Nhập tên người dùng.." />
          </Form.Item>

          <Form.Item label="Email:" name="email">
            <Input placeholder="Nhập email..." />
          </Form.Item>

          <Form.Item label="Mô tả bản thân:" name="bio">
            <Input.TextArea placeholder="Nhập mô tả bản thân..." />
          </Form.Item>

          <Form.Item label="Ngày gia nhập:">
            <div>
              {dateFormat(
                account?.timeJoin ?? new Date(),
                DateFormatType.FullDate
              )}
            </div>
          </Form.Item>

          <Form.Item label="Địa chỉ ví MetaMask: ">
            <Tippy
              interactive
              delay={[0, 10]}
              followCursor={true}
              plugins={[followCursor]}
              render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                  <p className="border-border border-[1px] px-[10px] py-[5px] rounded-[10px] shadow-md bg-white">
                    Copy
                  </p>
                </div>
              )}>
              <button
                onClick={handleCopy}
                className="flex items-center cursor-pointer">
                <CiWallet />
                <p className="pl-[10px]">{account?.wallet}</p>
              </button>
            </Tippy>
          </Form.Item>
        </div>
        <div className="flex flex-col pr-[50px]">
          <Form.Item label="Ảnh đại diện:">
            <Upload
              accept="image/*"
              customRequest={actionAva}
              listType="picture-circle"
              fileList={state.ava}
              onChange={onChangeAva}
              onPreview={onPreview}>
              {state.ava.length === 0 && "+ Thêm ảnh"}
            </Upload>
          </Form.Item>
          <Form.Item label="Ảnh bìa:">
            <Upload
              accept="image/*"
              customRequest={actionBanner}
              listType="picture-card"
              fileList={state.banner}
              onChange={onChangeBanner}
              onPreview={onPreview}>
              {state.banner.length === 0 && "+ Thêm ảnh"}
            </Upload>
          </Form.Item>
        </div>
      </div>
      <Form.Item label=" ">
        <Button htmlType="submit">Lưu lại chỉnh sửa</Button>
      </Form.Item>
      <Modal
        open={state.previewOpen}
        title={state.previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={state.previewImage} />
      </Modal>
      {state.visible && (
        <div className="absolute top-[-100px] right-[-150px]">
          <Alert
            message={
              state.alert
                ? "Chỉnh sửa trang cá nhân thành công"
                : "Chỉnh sửa trang cá nhân thất bại"
            }
            type={state.alert ? "success" : "error"}
            showIcon
            closable
          />
        </div>
      )}
    </Form>
  );
};

export default React.memo(SettingProfile);

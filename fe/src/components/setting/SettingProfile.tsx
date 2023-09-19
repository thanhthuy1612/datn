import React from "react";
import { Button, Form, Input, Upload, UploadFile, UploadProps } from "antd";
import { CiWallet } from "react-icons/ci";
import Tippy from "@tippyjs/react/headless";
import { IAccount } from "../../interfaces/IRouter";
import { RcFile } from "antd/es/upload";
import { useSelector } from "react-redux";
import { IStateRedux } from "../../redux";

interface IState {
  account?: IAccount;
  ava: UploadFile[];
  banner: UploadFile[];
}

const SettingProfile: React.FC = () => {
  const [state, _setState] = React.useState<IState>({ ava: [], banner: [] });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const { wallet } = useSelector((state: { item: IStateRedux }) => state.item);

  const onChangeAva: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setState({ ava: newFileList });
  };
  const onChangeBanner: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setState({ banner: newFileList });
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(wallet as string);
  };

  return (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      className="flex flex-col w-[100%]">
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

          <Form.Item label="Địa chỉ ví MetaMask: ">
            <Tippy
              interactive
              delay={[0, 10]}
              className="h-[100%]"
              render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                  <p className="border-border border-[1px] px-[10px] py-[5px] rounded-[10px] shadow-md">
                    Copy
                  </p>
                </div>
              )}>
              <button
                onClick={handleCopy}
                className="flex items-center cursor-pointer">
                <CiWallet />
                <p className="pl-[10px]">{wallet}</p>
              </button>
            </Tippy>
          </Form.Item>
        </div>
        <div className="flex flex-col pr-[250px]">
          <Form.Item label="Ảnh đại diện: ">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={state.ava}
              onChange={onChangeAva}
              onPreview={onPreview}>
              {state.ava.length === 0 && "+ Upload"}
            </Upload>
          </Form.Item>
          <Form.Item label="Ảnh bìa: ">
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={state.ava}
              onChange={onChangeBanner}
              onPreview={onPreview}>
              {state.banner.length === 0 && "+ Upload"}
            </Upload>
          </Form.Item>
        </div>
      </div>
      <Form.Item label=" ">
        <Button htmlType="submit">Lưu lại chỉnh sửa</Button>
      </Form.Item>
    </Form>
  );
};

export default SettingProfile;

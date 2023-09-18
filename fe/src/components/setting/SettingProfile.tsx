import React from "react";
import { Button, Form, Input } from "antd";
import { CiWallet } from "react-icons/ci";
import Tippy from "@tippyjs/react/headless";

const SettingProfile: React.FC = () => {
  return (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      className="flex flex-col w-[500px]">
      <Form.Item label="Tên người dùng:" name="username">
        <Input placeholder="Nhập tên người dùng.." />
      </Form.Item>

      <Form.Item label="Email:" name="email">
        <Input placeholder="Nhập email..." />
      </Form.Item>

      <Form.Item label="Mô tả bản thân:" name="bio">
        <Input.TextArea placeholder="Nhập mô tả bản thân..." />
      </Form.Item>

      <Form.Item label="Wallet">
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
          <div className="flex items-center cursor-pointer w-[160px]">
            <p className="pr-[5px]">12345</p>
            <CiWallet />
          </div>
        </Tippy>
      </Form.Item>

      <Form.Item label=" ">
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default SettingProfile;

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export interface IShowLayout {
  loading?: boolean,
  title?: string,
  chidren?: React.ReactNode
}
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
const renderloading = () => (
  <div className="w-[100%] h-[400px] flex justify-center items-center">
    <Spin indicator={antIcon} />
  </div>
);
const ShowLayout: React.FC<IShowLayout> = ({ loading, chidren, title }) => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);

  return (
    <div className="pt-[20px] w-[100%] overflow-hidden">
      <div className="w-[100%] text-[25px] flex justify-center">
        <p className="w-[400px] text-[25px] flex justify-center border-border border-[2px] rounded-[20px] p-[20px]">
          {title}
        </p>
      </div>
      <div className="w-[100%] flex mt-[30px] border-border border-[1px] shadow-md rounded-[20px]">
        {loading ? renderloading() : chidren}
      </div>
    </div>
  );
};

export default ShowLayout;
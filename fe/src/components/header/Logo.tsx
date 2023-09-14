import React from "react";
import logo from "../../assets/logo.png";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="flex justify-center items-center w-[50px] h-[50px] mr-[10px] rounded-[50%] bg-bgPrimary">
        <img src={logo} alt="Đồ án tốt nghiệp" className="w-[20px]" />
      </div>
      <span className="red text-[18px]">ĐỒ ÁN TỐT NGHIỆP</span>
    </div>
  );
};

export default Logo;

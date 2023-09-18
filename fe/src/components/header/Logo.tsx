import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <button onClick={handleClick} className="flex items-center">
      <div className="flex justify-center items-center w-[50px] h-[50px] mr-[10px] rounded-[50%] bg-bgPrimary">
        <img src={logo} alt="Đồ án tốt nghiệp" className="w-[20px]" />
      </div>
      <p className="red text-[20px] font-[500]">ĐỒ ÁN TỐT NGHIỆP</p>
    </button>
  );
};

export default Logo;

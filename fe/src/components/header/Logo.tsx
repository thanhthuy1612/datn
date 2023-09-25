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
      <img
        src={logo}
        alt="Đồ án tốt nghiệp"
        className="w-[45px] h-[45px] rounded-[50%]"
      />
      <p className="red text-[20px] font-[500] ml-[15px]">ĐỒ ÁN TỐT NGHIỆP</p>
    </button>
  );
};

export default React.memo(Logo);

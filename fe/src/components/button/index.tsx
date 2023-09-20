import React from "react";
import test from "../../assets/carousel1.jpg";

const ButtonItem: React.FC = () => {
  return (
    <div className="w-[330px] h-[400px] border-border border-[1px] m-[10px]">
      <img src={test} className="w-[340px] h-[340px]"/>
      <div>
        <p>Title 1</p>
        <div>
          <div>
            <p>Time</p>
            <p>123</p>
          </div>
          <div>
            <p>Giá</p>
            <p>123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonItem;

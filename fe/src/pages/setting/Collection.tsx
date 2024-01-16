import React from "react";
import SettingCollection from "../../components/setting/SettingCollection";

const Collection: React.FC = () => {
  return <div className="w-[100%]">
    <p className="text-[40px] py-[30px]">Chi tiết kho nông sản</p>
    <div className="w-[1000px]">
      <SettingCollection />
    </div>
  </div>
};

export default Collection;
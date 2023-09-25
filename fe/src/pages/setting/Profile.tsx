import React from "react";
import SettingProfile from "../../components/setting/SettingProfile";

const Profile: React.FC = () => {
  return (
    <div className="w-[100%]">
      <p className="text-[40px] py-[30px]">Chi tiết hồ sơ</p>
      <div className="w-[1000px]">
        <SettingProfile />
      </div>
    </div>
  );
};

export default Profile;

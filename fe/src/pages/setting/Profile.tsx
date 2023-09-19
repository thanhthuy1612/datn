import React from "react";
import SettingProfile from "../../components/setting/SettingProfile";

const Profile: React.FC = () => {
  return (
    <div className="w-[100%]">
      <p className="text-[40px] py-[50px]">Chi tiết hồ sơ</p>
      <SettingProfile />
    </div>
  );
};

export default Profile;

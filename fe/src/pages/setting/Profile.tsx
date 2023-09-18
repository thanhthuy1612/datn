import React from "react";
import SettingProfile from "../../components/setting/SettingProfile";

const Profile: React.FC = () => {
  return (
    <div>
      <p className="text-[40px] py-[50px]">Chi tiết hồ sơ</p>
      <SettingProfile />
    </div>
  );
};

export default Profile;

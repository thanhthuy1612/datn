import Tippy from "@tippyjs/react/headless";
import React from "react";
import { CiEdit, CiSettings, CiShare2 } from "react-icons/ci";
import ava from "../../assets/ava.png";
import banner from "../../assets/bannar.png";
import { DateFormatType, IAccount } from "../../interfaces/IRouter";
import { dateFormat } from "../../ultis";
import { Image, Modal } from "antd";
import SettingProfile from "../../components/setting/SettingProfile";
import { useNavigate } from "react-router-dom";

interface IState {
  previewOpen: boolean;
  previewTitle: string;
}

const Item: React.FC<{ title: string; item: string | undefined }> = ({
  title,
  item,
}) => {
  return (
    <p className="py-[2px] flex">
      <p className="w-[120px] font-[500]">{title}</p> {item}
    </p>
  );
};

const HeaderProfile: React.FC<{ account: IAccount | undefined }> = ({
  account,
}) => {
  const [state, _setState] = React.useState<IState>({
    previewOpen: false,
    previewTitle: "",
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const navigate = useNavigate();
  const handleShare = async () => {
    await navigator.clipboard.writeText(account?.wallet as string);
  };
  const handleSetting = () => {
    navigate("/setting");
  };
  const handleCancel = () => setState({ previewOpen: false });
  const handleOpenEdit = () =>
    setState({ previewOpen: true, previewTitle: "Chỉnh sửa trang cá nhân" });
  return (
    <div className="w-[100%] pt-[20px]">
      <div className="relative w-[100%]">
        <div className="w-[100%] h-[350px] rounded-[20px] shadow-md overflow-hidden">
          <Image width={"100%"} height={350} src={account?.banner ?? banner} />
        </div>
        <div className="border-white border-[5px] shadow-2xl rounded-[50%] w-[280px] h-[280px] absolute top-[150px] left-[50px] overflow-hidden">
          <Image width={280} height={280} src={account?.ava ?? ava} />
        </div>
      </div>
      <div className="mt-[100px] ml-[55px] mr-[20px] py-[5px] flex justify-between">
        <div>
          <div className="flex">
            <p className="text-[35px] font-[600]">
              {account?.username ?? "Tên người dùng"}
            </p>
            <button onClick={handleOpenEdit} className="mx-[15px] text-[30px]">
              <CiEdit />
            </button>
          </div>
          <Item title="Địa chỉ ví:" item={account?.wallet} />
          <Item
            title="Ngày tham gia:"
            item={dateFormat(
              account?.timeJoin ?? new Date(),
              DateFormatType.FullDate
            )}
          />
          {account?.email && (
            <Item title="Email liên lạc:" item={account?.email} />
          )}
          {account?.bio && <Item title="Tiểu sử:" item={account?.bio} />}
        </div>
        <div className="flex h-[fit-content]">
          <Tippy
            interactive
            delay={[0, 10]}
            render={(attrs) => (
              <div tabIndex={-1} {...attrs}>
                <p className="border-border border-[1px] px-[10px] py-[5px] rounded-[10px] shadow-md bg-white">
                  Chỉnh sửa
                </p>
              </div>
            )}>
            <button
              onClick={handleSetting}
              className="rounded-[50px] p-[10px] border-border border-[1px] shadow-md mx-[15px]">
              <CiSettings />
            </button>
          </Tippy>
          <Tippy
            interactive
            delay={[0, 10]}
            render={(attrs) => (
              <div tabIndex={-1} {...attrs}>
                <p className="border-border border-[1px] px-[10px] py-[5px] rounded-[10px] shadow-md bg-white">
                  Chia sẻ
                </p>
              </div>
            )}>
            <button
              onClick={handleShare}
              className="rounded-[50px] p-[10px] border-border border-[1px] shadow-md">
              <CiShare2 />
            </button>
          </Tippy>
        </div>
      </div>
      <Modal
        width={1000}
        open={state.previewOpen}
        title={state.previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <div className="w-[100%] border-border border-t-[1px] mt-[20px] pt-[20px]">
          <SettingProfile />
        </div>
      </Modal>
    </div>
  );
};

export default HeaderProfile;

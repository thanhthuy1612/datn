import Tippy from "@tippyjs/react/headless";
import React from "react";
import { CiEdit, CiSettings, CiShare2 } from "react-icons/ci";
import ava from "../../assets/ava.png";
import banner from "../../assets/bannar.png";
import { DateFormatType, IAccount, ITypeAccount } from "../../interfaces/IRouter";
import { dateFormat } from "../../ultis";
import { Image, Modal, Spin } from "antd";
import SettingProfile from "../../components/setting/SettingProfile";
import { useNavigate } from "react-router-dom";
import { getItemIPFS } from "../../api/uploadPicture";
import { LoadingOutlined } from "@ant-design/icons";

interface IState {
  previewOpen: boolean;
  previewTitle: string;
  ava: string;
  banner: string;
  loadingAva: boolean;
  loadingBanner: boolean;
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

const HeaderProfile: React.FC<{
  account: IAccount | undefined;
  personal: boolean;
}> = ({ account, personal }) => {
  const [state, _setState] = React.useState<IState>({
    previewOpen: false,
    previewTitle: "",
    ava: "",
    banner: "",
    loadingAva: true,
    loadingBanner: true
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetch = async () => {
      setState({ loadingAva: true, loadingBanner: true })
      if (account?.ava) {
        const ava = await getItemIPFS(account?.ava);
        const avaObjectURL = await URL.createObjectURL(ava);
        setState({ ava: avaObjectURL })
      }
      if (account?.banner) {
        const banner = await getItemIPFS(account?.banner);
        const bannerObjectURL = await URL.createObjectURL(banner);
        setState({ banner: bannerObjectURL })
      }

      setState({ loadingAva: false, loadingBanner: false })
    }
    fetch()
  }, [account])
  const handleShare = async () => {
    await navigator.clipboard.writeText(account?.wallet as string);
  };
  const handleSetting = () => {
    navigate("/setting");
  };
  const handleCancel = () => setState({ previewOpen: false });
  const handleOpenEdit = () =>
    setState({ previewOpen: true, previewTitle: "Chỉnh sửa trang cá nhân" });

  const antIcon = <LoadingOutlined style={{ fontSize: 21 }} spin />;
  const renderloading = () => (
    <div className="w-[500px] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );
  const getType = (type: ITypeAccount) => {
    switch (type) {
      case ITypeAccount.Farm:
        return "Nhà sản xuất"
      case ITypeAccount.Ship:
        return "Người vận chuyển"
      case ITypeAccount.Buy:
        return "Đại lý"
      case ITypeAccount.Custom:
        return "Người tiêu dùng"
      default: return ""
    }
  }
  return (
    <div className="w-[100%] pt-[20px]">
      <div className="relative w-[100%]">
        <div className="w-[100%] h-[380px] rounded-[20px] shadow-md overflow-hidden">
          {!state.loadingBanner ? <Image width={"100%"} height={400} src={account?.banner ? state.banner : banner} /> : <div className="w-[100%] h-[100%] flex justify-center items-center bg-hover">{renderloading()}</div>}
        </div>
        <div className="border-white border-[5px] shadow-2xl rounded-[50%] w-[290px] h-[290px] absolute top-[185px] left-[50px] overflow-hidden">
          {!state.loadingAva ? <Image width={280} height={280} src={account?.ava ? state.ava : ava} /> : <div className="w-[100%] h-[100%] flex justify-center items-center bg-hover">{renderloading()}</div>}
        </div>
      </div>
      <div className="mt-[120px] ml-[55px] mr-[20px] py-[5px] flex justify-between">
        <div>
          <div className="flex">
            <p className="text-[35px] font-[600]">
              {account?.username ?? "Tên người dùng"}
            </p>
            {personal && (
              <button
                onClick={handleOpenEdit}
                className="mx-[15px] text-[30px]">
                <CiEdit />
              </button>
            )}
          </div>
          <Item
            title="Vai trò:"
            item={getType(account?.type ?? ITypeAccount.None)}
          />
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
          {account?.address && <Item title="Địa chỉ:" item={account?.address} />}
          {account?.bio && <Item title="Tiểu sử:" item={account?.bio} />}
        </div>
        <div className="flex h-[fit-content]">
          {personal && (
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
          )}
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

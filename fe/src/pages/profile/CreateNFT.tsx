import { Modal } from "antd";
import React from "react";
import { CiCirclePlus, CiPen } from "react-icons/ci";
import Create from "../../components/NFT/Create";
import SettingProfile from "../../components/setting/SettingProfile";
import { useSelector } from "react-redux";
import { IStateRedux } from "../../redux";

interface IState {
  open: boolean;
  isCreateNFT: boolean;
  title: string;
}
const CreateNFT: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    open: false,
    isCreateNFT: true,
    title: "",
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const { loadingCreate } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const handleOpenCreate = () => {
    setState({ open: true, isCreateNFT: true, title: "Tạo NFT" });
  };
  const handleOpenEdit = () => {
    setState({
      open: true,
      isCreateNFT: false,
      title: "Chỉnh sửa trang cá nhân",
    });
  };

  const handleClose = () => {
    !loadingCreate && setState({ open: false });
  };

  return (
    <div className="w-[100%] flex">
      <div className="w-[100%] mt-[40px] border-border border-[1px] rounded-[20px] py-[25px] shadow-md flex justify-center flex-col">
        <div className="flex w-[100%] justify-center border-b-[1px] pb-[20px] border-border text-[20px]">
          Chỉnh sửa thông tin cá nhân
        </div>
        <div className="flex w-[100%] justify-around items-center">
          <button
            onClick={handleOpenCreate}
            className="w-[500px] mt-[40px] border-border border-[1px] rounded-[20px] py-[25px] shadow-md flex justify-center hover:bg-hover hover:shadow-xl">
            Thêm NFT vào kho của bạn
            <CiCirclePlus className="text-[25px] ml-[10px]" />
          </button>
          <button
            onClick={handleOpenEdit}
            className="w-[500px] mt-[40px] border-border border-[1px] rounded-[20px] py-[25px] shadow-md flex justify-center hover:bg-hover hover:shadow-xl">
            Thay đổi thông tin cá nhân
            <CiPen className="text-[25px] ml-[10px]" />
          </button>
        </div>
      </div>
      <Modal
        width={1000}
        open={state.open}
        title={state.title}
        footer={null}
        onCancel={handleClose}>
        <div className="w-[100%] border-border border-t-[1px] mt-[20px] pt-[20px]">
          {state.isCreateNFT ? <Create /> : <SettingProfile />}
        </div>
      </Modal>
    </div>
  );
};

export default CreateNFT;

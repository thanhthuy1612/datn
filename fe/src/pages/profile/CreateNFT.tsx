import { Modal } from "antd";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import Create from "../../components/NFT/Create";

interface IState {
  open: boolean;
}
const CreateNFT: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    open: false,
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const handleOpen = () => {
    setState({ open: true });
  };

  const handleClose = () => setState({ open: false });

  return (
    <div className="w-[100%] flex">
      <button
        onClick={handleOpen}
        className="w-[400px] bg-primary mt-[40px] border-border border-[1px] rounded-[20px] py-[25px] shadow-md flex justify-center">
        Thêm NFT mới của bạn:
        <CiCirclePlus className="text-[25px] ml-[10px]" />
      </button>
      <Modal
        width={1000}
        open={state.open}
        title="Tạo NFT"
        footer={null}
        onCancel={handleClose}>
        <div className="w-[100%] border-border border-t-[1px] mt-[20px] pt-[20px]">
          <Create />
        </div>
      </Modal>
    </div>
  );
};

export default CreateNFT;

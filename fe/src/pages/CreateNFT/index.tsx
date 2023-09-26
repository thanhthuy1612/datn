import React from "react";
import Create from "../../components/NFT/Create";

const CreateNFT: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
  }, []);
  return (
    <div className="mt-[20px] w-[100%] border-border border-[1px] shadow-md rounded-[20px] overflow-hidden">
      <p className="w-[100%] text-[25px] flex justify-center items-center border-border border-b-[1px] p-[20px]">
        Tạo NFT mới
      </p>
      <div className="px-[200px] py-[30px]">
        <Create />
      </div>
    </div>
  );
};

export default CreateNFT;

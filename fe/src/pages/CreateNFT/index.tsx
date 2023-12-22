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
    <div className="pt-[20px] w-[100%] overflow-hidden">
      <div className="w-[100%] text-[25px] flex justify-center">
        <p className="w-[400px] text-[25px] flex justify-center border-border border-[2px] rounded-[20px] p-[20px]">
          Tạo sản phẩm mới
        </p>
      </div>
      <div className="mt-[30px] border-border border-[1px] shadow-md rounded-[20px] px-[150px] py-[50px]">
        <Create />
      </div>
    </div>
  );
};

export default CreateNFT;

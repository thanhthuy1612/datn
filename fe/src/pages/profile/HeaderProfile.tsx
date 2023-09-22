import Tippy from "@tippyjs/react/headless";
import React from "react";
import { CiEdit, CiShare2 } from "react-icons/ci";
import ava from "../../assets/ava.png";
import banner from "../../assets/bannar.png";
import { DateFormatType, IAccount } from "../../interfaces/IRouter";
import { dateFormat } from "../../ultis";

const HeaderProfile: React.FC<{ account: IAccount | undefined }> = ({
  account,
}) => {
  const handleShare = async () => {
    await navigator.clipboard.writeText(account?.wallet as string);
  };
  return (
    <div className="w-[100%]">
      <div className="relative w-[100%]">
        <img
          src={account?.banner ?? banner}
          className="w-[100%] h-[300px] rounded-b-[20px] shadow-md"
        />
        <img
          src={account?.ava ?? ava}
          className="border-white border-[5px] shadow-2xl rounded-[50%] w-[250px] h-[250px] absolute top-[120px] left-[50px]"
        />
      </div>
      <div className="mt-[100px] ml-[55px] mr-[20px] py-[5px] flex justify-between">
        <div>
          <p className="text-[35px] font-[600]">
            {account?.username ?? "Tên người dùng"}
          </p>
          <p className="py-[2px]">
            Ngày tham gia:{" "}
            {dateFormat(
              account?.timeJoin ?? new Date(),
              DateFormatType.FullDate
            )}
          </p>
          {account?.email && (
            <p className="py-[2px]">Email liên lạc: {account?.email}</p>
          )}
          {account?.bio && <p className="py-[2px]">Tiểu sử: {account?.bio}</p>}
        </div>
        <div className="flex h-[fit-content]">
          <Tippy
            interactive
            delay={[0, 10]}
            render={(attrs) => (
              <div tabIndex={-1} {...attrs}>
                <p className="border-border border-[1px] px-[10px] py-[5px] rounded-[10px] shadow-md bg-white">
                  Chỉnh sửa trang cá nhân
                </p>
              </div>
            )}>
            <div className="rounded-[50px] p-[10px] border-border border-[1px] shadow-md mx-[15px]">
              <CiEdit />
            </div>
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
    </div>
  );
};

export default HeaderProfile;

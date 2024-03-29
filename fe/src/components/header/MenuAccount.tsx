import Tippy from "@tippyjs/react/headless";
import React from "react";
import {
  CiRead,
  CiBoxList,
  CiSettings,
  CiPen,
  CiBookmark,
  CiUser,
} from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IStateRedux } from "../../redux";
import { ITypeAccount } from "../../interfaces/IRouter";

interface IMenu {
  id: number;
  icon: React.ReactNode;
  title: string;
  to: string;
  disable?: boolean
}
const menu: IMenu[] = [
  {
    id: 1,
    icon: <CiRead />,
    title: "Trang cá nhân",
    to: `/personal`,
  },
  {
    id: 2,
    icon: <CiBookmark />,
    title: "Lịch sử giao dịch",
    to: `/history`,
  },
  {
    id: 3,
    icon: <CiBoxList />,
    title: "Kho sản phẩm",
    to: `/myNFT`,
  },
  {
    id: 4,
    icon: <CiPen />,
    title: "Tạo sản phẩm mới",
    to: `/createNFT`,
    disable: true
  },
  {
    id: 5,
    icon: <CiSettings />,
    title: "Cài đặt",
    to: `/setting`,
  },
];
const MenuAccount: React.FC = () => {
  const navigate = useNavigate();
  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  const handleClick = (to: string) => () => {
    navigate(to);
  };

  const renderBody = (item: IMenu) => {
    if (!item.disable || (item.disable && account?.type === ITypeAccount.Farm)) {
      return <button
        className="w-[100%] flex items-center hover:bg-hover p-[5px]"
        key={item.id}
        onClick={handleClick(item.to)}>
        <div className="px-[10px]">{item.icon}</div>
        <p>{item.title}</p>
      </button>
    }
    return <></>
  }
  return (
    <Tippy
      interactive
      disabled={!account || account?.type === ITypeAccount.None}
      delay={[0, 500]}
      render={(attrs) => (
        <div
          className="flex border-border border-[1px] shadow-md flex-col py-[15px] bg-white rounded-[15px] w-[200px] z-10"
          tabIndex={-1}
          {...attrs}>
          {menu.map((item, index) => (
            <div className="w-[100%]" key={index}>{renderBody(item)}</div>
          ))}
        </div>
      )}>
      <div className="px-[15px] hover:bg-hover h-[100%] flex items-center hover:rounded-r-[15px]">
        <CiUser />
      </div>
    </Tippy>
  );
};

export default React.memo(MenuAccount);

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
import { useNavigate } from "react-router-dom";

interface IMenu {
  id: number;
  icon: React.ReactNode;
  title: string;
  to: string;
}

const MenuAccount: React.FC = () => {
  const navigate = useNavigate();
  const menu: IMenu[] = [
    {
      id: 1,
      icon: <CiRead />,
      title: "Trang cá nhân",
      to: `/`,
    },
    {
      id: 2,
      icon: <CiBookmark />,
      title: "Lịch sử giao dịch",
      to: `/`,
    },
    {
      id: 3,
      icon: <CiBoxList />,
      title: "Bộ sưu tập",
      to: `/`,
    },
    {
      id: 4,
      icon: <CiPen />,
      title: "Tạo NFT mới",
      to: `/`,
    },
    {
      id: 5,
      icon: <CiSettings />,
      title: "Cài đặt",
      to: `/setting`,
    },
  ];
  const handleClick = (to: string) => () => {
    navigate(to);
  };
  return (
    <Tippy
      interactive
      delay={[0, 500]}
      render={(attrs) => (
        <div
          className="flex border-border border-[1px] shadow-md flex-col py-[15px] bg-white rounded-[15px] w-[200px]"
          tabIndex={-1}
          {...attrs}>
          {menu.map((item) => (
            <button
              className="flex items-center hover:bg-hover p-[5px]"
              key={item.id}
              onClick={handleClick(item.to)}>
              <div className="px-[10px]">{item.icon}</div>
              <p>{item.title}</p>
            </button>
          ))}
        </div>
      )}>
      <div className="px-[15px] hover:bg-hover h-[100%] flex items-center hover:rounded-r-[15px]">
        <CiUser />
      </div>
    </Tippy>
  );
};

export default MenuAccount;

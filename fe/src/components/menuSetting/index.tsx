import React from "react";
import { CiEdit, CiGrid32, CiBellOn, CiReceipt } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

interface IMenu {
  id: number;
  icon: React.ReactNode;
  title: string;
  to: string;
}
interface IState {
  to?: string;
}
const MenuSetting: React.FC = () => {
  const location = useLocation();
  const [state, _setState] = React.useState<IState>({ to: location.pathname });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const navigate = useNavigate();
  const menu: IMenu[] = [
    {
      id: 1,
      icon: <CiEdit />,
      title: "Chỉnh sửa trang cá nhân",
      to: "/setting",
    },
    {
      id: 2,
      icon: <CiGrid32 />,
      title: "Bộ sưu tập",
      to: `/collection`,
    },
    {
      id: 3,
      icon: <CiBellOn />,
      title: "Thông báo",
      to: `/notification`,
    },
    {
      id: 4,
      icon: <CiReceipt />,
      title: "Chăm sóc khách hàng",
      to: `/client`,
    },
  ];
  React.useEffect(() => {
    if (location.pathname !== state.to) {
      setState({ to: location.pathname });
    }
  }, [location.pathname]);
  const handleClick = (to: string) => () => {
    navigate(to);
    setState({ to: to });
  };
  return (
    <div className="flex w-[300px] flex-col">
      <p className="text text-[30px] pt-[25px] pb-[20px] pl-[25px] border-border border-r-[1px]">
        Cài đặt
      </p>
      <div className="w-[100%]">
        {menu.map((item) => (
          <button
            key={item.id}
            className={
              state.to === item.to
                ? "flex w-[100%] items-center py-[20px] pl-[20px] rounded-l-[20px] cursor-pointer border-border border-[1px] border-r-[0px] shadow-xl"
                : "flex w-[100%] items-center py-[15px] pl-[20px] rounded-l-[15px] hover:bg-settingHover cursor-pointer border-border border-r-[1px]"
            }
            onClick={handleClick(item.to)}>
            <div className="pr-[10px]">{item.icon}</div>
            <p>{item.title}</p>
          </button>
        ))}
      </div>
      <div className="border-border border-r-[1px] h-[100%]"></div>
    </div>
  );
};

export default React.memo(MenuSetting);

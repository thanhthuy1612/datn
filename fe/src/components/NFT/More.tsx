import { Drawer, Image } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IStateRedux, setAccountSearch, store } from "../../redux";
import { useNavigate } from "react-router-dom";

const More: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { item, account } = useSelector((state: { item: IStateRedux }) => state.item);
  const navigate = useNavigate()

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = (wallet: string) => () => {
    if (account && account.wallet === wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };

  const renderPanel = () => (
    <>
      {item.list.map((item: any, index: number) =>
        <>{item?.img !== '' ? (
          <>
            <p className="text-[17px] mb-[5px] font-bold">{index === 0 ? 'Khởi tạo:' : 'Cập nhật:'}</p>
            <div key={item.img} className="flex mb-[20px]">
              <Image
                width={300}
                height={300}
                src={item.img}
              />
              <div className="ml-[20px]">
                <div className="mb-[10px]">
                  <p className="text-[17px] mb-[3px]">Người đăng:</p>
                  <p className="text-settingChoose cursor-pointer underline" onClick={handleClick(item.create)}>{item.create}</p>
                </div>
                <div>
                  <p className="text-[17px] mb-[3px]">Ngày tạo:</p>
                  <p>{item.date}</p>
                </div>
              </div>
            </div></>) :
          (<div className='mb-[20px]'>
            <p className="text-[17px] mb-[5px] font-bold">{item.status ? 'Bán:' : 'Mua:'}</p>
            <div className="mb-[10px]">
              <p className="text-[17px] mb-[3px]">{item.status ? 'Người bán:' : 'Người mua:'}</p>
              <p className="text-settingChoose cursor-pointer underline" onClick={handleClick(item.create)}>{item.create}</p>
            </div>
            <div>
              <p className="text-[17px] mb-[3px]">{item.status ? 'Ngày bán:' : 'Ngày mua:'}</p>
              <p>{item.date}</p>
            </div>
          </ div>)}
        </>
      )}
    </>
  )

  return (
    <>
      <p className=" text-settingChoose cursor-pointer underline" onClick={showDrawer}>
        Xem chi tiết
      </p>
      <Drawer
        title="Truy xuất nguồn gốc"
        placement="right"
        onClose={onClose}
        open={open}
        size='large'
      >
        {renderPanel()}
      </Drawer>
    </>
  );
};
export default More;

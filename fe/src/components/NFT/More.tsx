import React from "react";
import { IStateRedux } from "../../redux";
import { useSelector } from "react-redux";
import { Drawer } from "antd";

const More: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { item } = useSelector((state: { item: IStateRedux }) => state.item);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  console.log(item);

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
      </Drawer>
    </>
  );
};
export default More;

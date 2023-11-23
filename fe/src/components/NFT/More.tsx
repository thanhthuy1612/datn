import { Drawer, Image, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IStateRedux, setAccountSearch, store } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getItem, getItemIPFS } from "../../api/uploadPicture";
import { dateFormat } from "../../ultis";
import { DateFormatType } from "../../interfaces/IRouter";
import { LoadingOutlined } from "@ant-design/icons";

const More: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [listItems, setListItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { account } = useSelector((state: { item: IStateRedux }) => state.item);
  const localtion = useLocation();
  const items = localtion.state;

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetch = async (params: string) => {
      const meta = await Promise.all(
        params.split(";").map(async (item: string) => {
          const result = await getItem(item);
          if (result.img !== "") {
            const picture = await getItemIPFS(result.img);
            const imageObjectURL = URL.createObjectURL(picture);
            return {
              ...result,
              img: imageObjectURL,
              date: dateFormat(new Date(result.date), DateFormatType.FullDate),
            };
          } else {
            return {
              ...result,
              img: "",
              date: dateFormat(new Date(result.date), DateFormatType.FullDate),
            };
          }
        })
      );
      setListItems(meta);
      setLoading(false);
    };
    open && fetch(items.list);
  }, [items.list, open])

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
      {listItems.map((item: any, index: number) =>
        <>{item?.img !== '' ? (
          <>
            <p className="text-[17px] mb-[5px] font-bold">{index === 0 ? 'Khởi tạo:' : 'Cập nhật:'}</p>
            <div key={item?.img} className="flex mb-[20px]">
              <Image
                width={300}
                height={300}
                src={item?.img}
              />
              <div className="ml-[20px]">
                <div className="mb-[10px]">
                  <p className="text-[17px] mb-[3px]">Người đăng:</p>
                  <p className="text-settingChoose cursor-pointer underline" onClick={handleClick(item?.create)}>{account && account.wallet === item.create ? `${item.create} (Bạn)` : item.create}</p>
                </div>
                <div>
                  <p className="text-[17px] mb-[3px]">Ngày tạo:</p>
                  <p>{item?.date}</p>
                </div>
                <div>
                  <p className="text-[17px] mb-[3px]">Mô tả:</p>
                  <p>{item?.description}</p>
                </div>
              </div>
            </div>
          </>) :
          (<div className='mb-[20px]'>
            <p className="text-[17px] mb-[5px] font-bold">{item?.status ? 'Bán:' : (account && account.wallet === item.create) ? "Thu hồi: " : 'Mua:'}</p>
            <div className="mb-[10px]">
              <p className="text-[17px] mb-[3px]">{item.status ? 'Người bán:' : 'Người mua:'}</p>
              <p className="text-settingChoose cursor-pointer underline" onClick={handleClick(item?.create)}>{account && account.wallet === item.create ? `${item.create} (Bạn)` : item.create}</p>
            </div>
            {
              item.status && <div>
                <p className="text-[17px] mb-[3px]">Giá bán:</p>
                <p>{item?.price ?? 0} BNBT</p>
              </div>
            }
            <div>
              <p className="text-[17px] mb-[3px]">{item?.status ? 'Ngày bán:' : 'Ngày mua:'}</p>
              <p>{item?.date}</p>
            </div>
            {item?.description && <div>
              <p className="text-[17px] mb-[3px]">Mô tả:</p>
              <p>{item?.description}</p>
            </div>}
          </ div>)}
        </>
      )}
    </>
  )

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  const renderloading = () => (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );

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
        {loading ? renderloading() : renderPanel()}
      </Drawer>
    </>
  );
};
export default More;

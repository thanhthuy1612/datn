import { Drawer, Image, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { IStateRedux, setAccountSearch, store } from "../../redux";
import { useNavigate } from "react-router-dom";
import { getItem, getItemIPFS } from "../../api/uploadPicture";
import { dateFormat } from "../../ultis";
import { DateFormatType, ITypeAccount } from "../../interfaces/IRouter";
import { LoadingOutlined } from "@ant-design/icons";

export interface IMoreProps {
  items: any
}
const More: React.FC<IMoreProps> = ({ items }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [listItems, setListItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { account } = useSelector((state: { item: IStateRedux }) => state.item);

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
  }, [items?.list, open])

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getTiTle = (item: any) => {
    switch (item?.status) {
      case 0:
        return 'Bán:'
      case 1:
        return 'Mua:'
      case 2:
        return 'Nhận giao hàng:'
    }
  }

  const getTiTleRole = (item: any) => {
    switch (item?.status) {
      case 0:
        return 'Người bán'
      case 1:
        return 'Người mua'
      case 2:
        return 'Người giao'
    }
  }

  const getTiTleDate = (item: any) => {
    switch (item?.status) {
      case 0:
        return 'Ngày bán'
      case 1:
        return 'Ngày mua'
    }
  }

  const handleClick = (wallet: string) => () => {
    if (account && account.wallet === wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };

  const handleClickShow = async (tokenId: number) => {
    navigate("/nft/view-id", { state: tokenId })
  }

  const renderBody = (item: any, index: number) => {
    switch (item?.status) {
      case 0:
        return <>{item?.img !== '' ? (
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
                  <p className="text-[17px] mb-[3px]">Người tạo:</p>
                  <button className="text-settingChoose cursor-pointer underline" onClick={handleClick(item?.create)}>{account && account.wallet === item.create ? `${item.create} (Bạn)` : item.create}</button>
                </div>
                <div className="flex">
                  <p className="mr-[10px]">Ngày tạo:</p>
                  <p>{item?.date}</p>
                </div>
                <div className="flex">
                  <p className="mr-[10px]">Mô tả:</p>
                  <p>{item?.description}</p>
                </div>
                {item?.kg && <div className="flex">
                  <p className="mr-[10px]">Trọng lượng:</p>
                  <p>{item?.kg / 1000} kg</p>
                </div>}
                {item?.item && <div className="flex">
                  <p className="mr-[10px]">Lô sản phẩm:</p>
                  <button className="text-settingChoose cursor-pointer underline" onClick={() => handleClickShow(item?.item)}>Xem tại đây</button>
                </div>}
              </div>
            </div>
          </>) :
          (<div className='mb-[20px]'>
            <p className="text-[17px] mb-[5px] font-bold">{getTiTle(item)}</p>
            <div className="mb-[10px]">
              <p className="text-[17px] mb-[3px]">{getTiTleRole(item)}</p>
              <button className="text-settingChoose cursor-pointer underline" onClick={handleClick(item?.create)}>{account && account.wallet === item.create ? `${item.create} (Bạn)` : item.create}</button>
            </div>
            {(account?.type !== ITypeAccount.Ship) && <div className="flex">
              <p className="mr-[10px]">Giá sản phẩm:</p>
              <p>{item?.price} BNBT</p>
            </div>}
            <div className="flex">
              <p className="mr-[10px]">{getTiTleDate(item)}</p>
              <p>{item?.date}</p>
            </div>
            {item?.description && <div className="flex">
              <p className="mr-[10px]">Mô tả:</p>
              <p>{item?.description}</p>
            </div>}
            {item?.kg && <div className="flex">
              <p className="mr-[10px]">Trọng lượng:</p>
              <p>{item?.kg / 1000} kg</p>
            </div>}
          </ div>)}
        </>
      case 1:
      case 2:
        return <div className='mb-[20px]'>
          <p className="text-[17px] mb-[5px] font-bold">{getTiTle(item)}</p>
          <div className="mb-[10px]">
            <p className="text-[17px] mb-[3px]">{getTiTleRole(item)}</p>
            <button className="text-settingChoose cursor-pointer underline" onClick={handleClick(item?.create)}>{account && account.wallet === item.create ? `${item.create} (Bạn)` : item.create}</button>
          </div>
          <div className="flex">
            <p className="mr-[10px]">{getTiTleDate(item)}</p>
            <p>{item?.date}</p>
          </div>
          {item?.description && <div className="flex">
            <p className="mr-[10px]">Mô tả:</p>
            <p>{item?.description}</p>
          </div>}
        </ div>
      case 3:
        return <>
          <p className="text-[17px] mb-[5px] font-bold">Giao hàng thành công:</p>
          <div key={item?.img} className="flex mb-[20px]">
            <Image
              width={300}
              height={300}
              src={item?.img}
            />
            <div className="ml-[20px]">
              <div className="mb-[10px]">
                <p className="text-[17px] mb-[3px]">Người giao hàng:</p>
                <button className="text-settingChoose cursor-pointer underline" onClick={handleClick(item?.create)}>{account && account.wallet === item.create ? `${item.create} (Bạn)` : item.create}</button>
              </div>
              <div className="flex">
                <p className="mr-[10px]">Ngày tạo:</p>
                <p>{item?.date}</p>
              </div>
              <div className="flex">
                <p className="mr-[10px]">Mô tả:</p>
                <p>{item?.description}</p>
              </div>
            </div>
          </div>
        </>
      case 4:
        return <>
          <p className="text-[17px] mb-[5px] font-bold">Xác nhận giao hàng thành công:</p>
          <div key={item?.img} className="flex mb-[20px]">
            <Image
              width={300}
              height={300}
              src={item?.img}
            />
            <div className="ml-[20px]">
              <div className="mb-[10px]">
                <p className="text-[17px] mb-[3px]">Người nhận:</p>
                <button className="text-settingChoose cursor-pointer underline" onClick={handleClick(item?.create)}>{account && account.wallet === item.create ? `${item.create} (Bạn)` : item.create}</button>
              </div>
              <div className="flex">
                <p className="mb-[10px]">Ngày tạo:</p>
                <p>{item?.date}</p>
              </div>
              <div className="flex">
                <p className="mb-[10px]">Mô tả:</p>
                <p>{item?.description}</p>
              </div>
            </div>
          </div>
        </>
    }
  }

  const renderPanel = () => (
    <>
      {listItems.map((item: any, index: number) =>
        <>{renderBody(item, index)}</>
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
    <div className="flex">
      <button className=" text-settingChoose cursor-pointer underline" onClick={showDrawer}>
        Xem chi tiết
      </button>
      <Drawer
        title="Truy xuất nguồn gốc"
        placement="right"
        onClose={onClose}
        open={open}
        size='large'
      >
        {loading ? renderloading() : renderPanel()}
      </Drawer>
    </div>
  );
};
export default More;

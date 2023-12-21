import React from "react";
import { Button, Form, Image, Input, Modal, Spin } from "antd";
import { CiClock1 } from "react-icons/ci";
import { useSelector } from "react-redux";
import { IStateRedux, createMarketSale, setAccountSearch, setTotalCart, store } from "../../redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import More from "./More";
import { DateFormatType, ICart } from "../../interfaces/IRouter";
import { dateFormat, removeUnnecessaryWhiteSpace } from "../../ultis";
import { addCart, deleteCart, getCartsByTokenUri } from "../../api/cart";
import ShowLayout from "../../layouts/ShowLayout";

const BuyNFT: React.FC = () => {
  const [cart, setCart] = React.useState<ICart[]>([]);
  const [reload, setReload] = React.useState<boolean>(true);
  const [isModalOpenCreate, setIsModalOpenCreate] = React.useState<boolean>(false);

  const { loading, account, totalCart } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  const localtion = useLocation();
  const item = localtion.state;
  const navigate = useNavigate();
  const fetch = async () => {
    if (account) {
      const res = await getCartsByTokenUri({ account: account?.wallet, url: item.tokenId })
      setCart(res.data)
      setReload(false)
    }
  }
  React.useEffect(() => {
    fetch()
  }, [account]);

  const handleBuy = async (values: any) => {
    await store.dispatch(createMarketSale({
      item: item,
      to: removeUnnecessaryWhiteSpace(values.to)
    }));
    navigate("/");
  };
  const handleClick = (wallet: string) => () => {
    if (account && account.wallet === wallet) {
      navigate("/personal");
    } else {
      store.dispatch(setAccountSearch(account));
      navigate("/search");
    }
  };
  const showModalCreate = () => {
    setIsModalOpenCreate(true);
  };

  const handleCancelCreate = () => {
    setIsModalOpenCreate(false);
  };
  const handleAddCart = async () => {
    setReload(true)
    await addCart({ account: account?.wallet, url: item.tokenId })
    await fetch()
    store.dispatch(setTotalCart(totalCart ? totalCart + 1 : 1))
    setReload(false)
  }
  const handleDeleteCart = async () => {
    setReload(true)
    await deleteCart(cart[0]?._id ?? '')
    await fetch()
    store.dispatch(setTotalCart(totalCart ? totalCart - 1 : 0))
    setReload(false)
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 21 }} spin />;
  const renderloading = () => (
    <div className="w-[500px] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );

  const renderForm = () => (
    <Form
      name="account"
      layout="vertical"
      wrapperCol={{ flex: 1 }}
      colon={false}
      onFinish={handleBuy}
      className="flex flex-col w-[300px] items-center">
      <div className="flex w-[100%] justify-between">
        <div className="flex flex-col w-[300px]">
          <Form.Item
            label="Địa chỉ của bạn:"
            name="to"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}>
            <Input placeholder="Nhập địa chỉ..." />
          </Form.Item>
          <Form.Item label=" ">
            <Button htmlType="submit" disabled={loading}>
              {loading ? renderloading() : "Bán sản phẩm"}
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );

  const renderBody = () => (<div className="py-[40px] flex w-[100%] justify-around">
    <div className="w-[450px] h-[450px] rounded-[20px] shadow-md overflow-hidden">
      <Image width={"100%"} height={500} src={item.img} />
    </div>
    <div className="w-[700px] rounded-[20px] flex flex-col justify-between">
      <div>
        <p className="mt-[5px] mb-[10px] text-[35px] w-[700px] font-[500] overflow-hidden whitespace-nowrap overflow-ellipsis">
          {item.title.toUpperCase()}
        </p>
        <p>
          Người bán:{" "}
          <button onClick={handleClick(item.seller)} className="text-settingChoose cursor-pointer underline">{account && account.wallet === item.seller ? `${item.seller} (Bạn)` : item.seller}</button>
        </p>
        <div className="flex items-center pt-[15px]">
          Ngày bắt đầu bán: {item.date}
        </div>
        <More />
      </div>
      <div className="border-border border-[1px] py-[20px] rounded-[20px] w-[100%] shadow-md">
        <p className="flex items-center border-border px-[30px] pb-[20px] border-b-[1px] w-[100%]">
          <div className="pr-[10px]">
            <CiClock1 />
          </div>{" "}
          Thời gian hết hạn: {dateFormat(
            new Date(item.expired),
            DateFormatType.FullDate
          )}
        </p>
        <div className="w-[100%]">
          <p className="py-[20px] text-[30px] flex justify-center">
            Giá bán: {item.price} BNBT
          </p>
          <div className="flex w-[100%] justify-around">
            <button
              onClick={showModalCreate}
              disabled={loading}
              className={
                loading
                  ? "border-border bg-border border-[1px] py-[20px] w-[300px] flex justify-center items-center rounded-[20px] shadow-md cursor-not-allowed"
                  : "border-border border-[1px] py-[20px] w-[300px] flex justify-center items-center rounded-[20px] shadow-md hover:shadow-xl hover:bg-hover"
              }>
              Mua ngay
            </button>
            <Modal title="Bán sản phẩm" open={isModalOpenCreate} onCancel={handleCancelCreate} footer={null}>
              {renderForm()}
            </Modal>
            <button
              className={
                reload || loading
                  ? "border-border bg-border border-[1px] py-[20px] w-[300px] flex justify-center items-center rounded-[20px] shadow-md cursor-not-allowed"
                  : "border-border border-[1px] py-[20px] w-[300px] flex justify-center items-center rounded-[20px] shadow-md hover:shadow-xl hover:bg-hover"
              }
              disabled={loading || reload}
              onClick={cart?.length === 0 ? handleAddCart : handleDeleteCart}>
              {reload ? renderloading() : cart?.length ? 'Đã trong giỏ hàng (Nhấn Xóa)' : 'Thêm vào giỏ hàng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>)
  return (
    <ShowLayout chidren={renderBody()} title="Mua NFT" />
  );
};

export default BuyNFT;

import React from "react";
import ButtonItem from "../../components/button";
import { IStateRedux, getCartAccount, store } from "../../redux";
import { Empty, Pagination } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../../api/cart";
import ShowLayout from "../../layouts/ShowLayout";
import { ITypeAccount } from "../../interfaces/IRouter";
interface IState {
  page: number;
  pageSize: number;
  reLoad: boolean;
}
const Cart: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    page: 1,
    pageSize: 8,
    reLoad: false
  });
  const { loading, account, cart } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const ref = React.useRef<null | HTMLDivElement>(null);
  const navigate = useNavigate();
  const fetch = async () => {
    await store.dispatch(getCartAccount(account?.wallet ?? ''))
  }
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: `smooth`,
    });
    fetch()
  }, [account]);
  const onChange = (page: number, pageSize: number) => {
    setState({ page: page, pageSize: pageSize });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleClick = (item: any) => () => {
    navigate(item.seller === account?.wallet ? `/nft/expired` : `/nft/buy`, { state: item });
  };
  const handleDeleteCart = (id: string) => async () => {
    await deleteCart(id);
    await fetch();
  }
  const check = (item: any)=>{
    if(item.sold){
      return true;
    }
    if(item.expired < new Date()){
      return true
    }
    if(account?.type === ITypeAccount.Buy && item?.number !== 0){
      return true;
    }
    if(account?.type === ITypeAccount.Custom && item?.number !== 4){
      return true;
    }
    return false
  }
  const renderList = () => (
    <>
      {cart && cart.length > 0 ? (
        cart
          .slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
          .map((item: any) => (
            <button
              onClick={check(item) ? handleDeleteCart(item._id) : handleClick(item)}
              className={"basis-[25%] h-[510px]"}
              key={item.id}>
              <ButtonItem
                title={item.title}
                date={item.date}
                price={item.price}
                img={item.img}
                cart={check(item)}
              />
            </button>
          ))
      ) : (
        <div className="w-[100%] flex justify-center items-center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 200, width: 200 }}
            description={"Không có dữ liệu"}
          />
        </div>
      )}
      {cart && cart.length > 0 && (
        <div className="w-[100%] flex items-end justify-center mt-[50px] mb-[20px]">
          <Pagination
            total={cart.length}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={[8, 12, 16, 20]}
            defaultPageSize={8}
            showTotal={(total) => `Tổng ${total} phần tử`}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );

  return (
    <ShowLayout title="Giỏ hàng" loading={loading} chidren={renderList()} />
  );
};

export default Cart;

import React from "react";
import ButtonItem from "../../components/button";
import { IStateRedux, getCartAccount, setItem, store } from "../../redux";
import { Empty, Pagination, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCart } from "../../api/cart";
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

  console.log(cart)

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
    store.dispatch(setItem(item));
    console.log(1)
    navigate("/nft/buy");
  };
  const handleDeleteCart = (id: string) => async () => {
    await deleteCart(id);
    await fetch();
  }
  const renderList = () => (
    <>
      {cart && cart.length > 0 ? (
        cart
          .slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
          .map((item: any) => (
            <button
              onClick={item.sold || item.expired < new Date() ? handleDeleteCart(item._id) : handleClick(item)}
              className={"basis-[25%] h-[510px]"}
              key={item.id}>
              <ButtonItem
                title={item.title}
                date={item.date}
                price={item.price}
                img={item.img}
                cart={item.sold || item.expired < new Date()}
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
        <div className="w-[100%] flex items-end justify-center mt-[50px]">
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
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const renderloading = () => (
    <div className="w-[100%] flex justify-center items-center">
      <Spin indicator={antIcon} />
    </div>
  );
  return (
    <div className="pt-[20px] w-[100%] overflow-hidden">
      <div className="w-[100%] text-[25px] flex justify-center">
        <p className="w-[400px] text-[25px] flex justify-center border-border border-[2px] rounded-[20px] p-[20px]">
          Giỏ hàng
        </p>
      </div>
      <div className="py-[30px] flex flex-wrap w-[100%] border-[1px] rounded-[20px] mt-[20px] min-h-[680px] shadow-xl">
        {loading ? renderloading() : renderList()}
      </div>
    </div>
  );
};

export default Cart;

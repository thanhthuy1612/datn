import React from "react";
import ButtonItem from "../../components/button";
import { Empty, Pagination, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStateRedux, fetchMarketItemsPast, store } from "../../redux";
import { LoadingOutlined } from "@ant-design/icons";
import { ITypeAccount } from "../../interfaces/IRouter";

interface IState {
  page: number;
  pageSize: number;
  choose: number;
  items: any[];
}
interface IMenu {
  id: number;
  title: string;
}

const OldNFT: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    page: 1,
    pageSize: 8,
    choose: 1,
    items: [],
  });

  const menu: IMenu[] = [
    {
      id: 1,
      title: "Nông sản của nhà sản xuất"
    },
    {
      id: 2,
      title: "Sản phẩm đại lý đăng bán",
    },
  ];

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const ref = React.useRef<null | HTMLDivElement>(null);
  const { past, loadingPast, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    store.dispatch(fetchMarketItemsPast());
  }, []);

  const getNavigate = (item: any) => {
    if (account?.type === ITypeAccount.Buy) return '/nft/buy'
    return item.seller === account?.wallet ? `/nft/expired` : `/nft/view`
  }
  const handleClickNav = (id: number) => () => {
    id !== state.choose && setState({ choose: id });
  };

  React.useEffect(() => {
    const getItems = async () => {
      switch (state.choose) {
        case 1:
          setState({ items: (past ?? []).filter((item) => item.number === 0) });
          break;
        case 2:
          setState({ items: (past ?? []).filter((item) => item.number === 4) });
          break;
      }
    };
    getItems();
  }, [past, state.choose]);

  const setNavigate = (item: any) => {
    switch (state.choose) {
      case 1:
        return getNavigate(item)
      case 2:
        return item.seller === account?.wallet ? `/nft/expired` : `/nft/view`
      default:
        return ""
    }
  }

  const handleClick = (item: any) => () => {
    navigate(setNavigate(item), { state: item });
  };

  const onChange = (page: number, pageSize: number) => {
    setState({ page: page, pageSize: pageSize });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderList = () => (
    <>
      {state.items.length > 0 ? (
        state.items
          .slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
          .map((item) => (
            <button
              onClick={handleClick(item)}
              className="basis-[25%] h-[510px]"
              key={item.id}>
              <ButtonItem
                title={item.title}
                date={item.date}
                price={item.price}
                img={item.img}
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
      {state.items.length > 0 && (
        <div className="w-[100%] flex items-end justify-center mt-[50px]">
          <Pagination
            total={state.items.length}
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
    <div className="w-[100%] z-0" ref={ref}>
      <div className="flex h-[70px] items-end w-[100%] mt-[50px]">
        {menu.map((item) => (
          <button
            onClick={handleClickNav(item.id)}
            key={item.id}
            className={
              state.choose === item.id
                ? "p-[20px] text-[20px] flex items-center justify-center w-[350px] h-[100%] border-[1px] border-b-[0px] border-border rounded-t-[15px]"
                : "p-[20px] text-[20px] flex items-center justify-center w-[350px] h-[calc(100%-20px)] border-[1px] border-border rounded-t-[15px] bg-hover hover:shadow-xl"
            }>
            {item.title}
          </button>
        ))}
        <div className="border-b-[1px] border-border w-[calc(100%-718px)]"></div>
      </div>
      <div className="py-[50px] flex flex-wrap w-[100%] border-[1px] min-h-[680px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl">
        {!loadingPast ? renderList() : renderloading()}
      </div>
    </div>
  );
};

export default React.memo(OldNFT);

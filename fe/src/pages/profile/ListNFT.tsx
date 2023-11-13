import React from "react";
import ButtonItem from "../../components/button";
import { Empty, Pagination, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { IStateRedux, fetch, setItem, store } from "../../redux";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

interface IMenu {
  id: number;
  title: string;
}
const menu: IMenu[] = [
  {
    id: 1,
    title: "NFT của bạn",
  },
  {
    id: 2,
    title: "NFT đang bán",
  },
  {
    id: 3,
    title: "NFT hết hạn",
  },
  {
    id: 4,
    title: "NFT mới tạo"
  }
];

interface IState {
  page: number;
  pageSize: number;
  choose: number;
  items: any[];
}

const ListNFT: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    page: 1,
    pageSize: 8,
    choose: 1,
    items: [],
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const navigate = useNavigate();
  const { myNFT, mySeller, myDate, myNew, loading, account } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );
  const handleClickItem = (item: any) => () => {
    store.dispatch(setItem(item));
    navigate(setNavigate());
  };
  React.useEffect(() => {
    const renderRedux = async () => {
      await store.dispatch(fetch());
    };
    renderRedux();
  }, [account]);
  React.useEffect(() => {
    const getItems = async () => {
      switch (state.choose) {
        case 1:
          setState({ items: myNFT });
          break;
        case 2:
          setState({ items: mySeller });
          break;
        case 3:
          setState({ items: myDate });
          break;
        case 4:
          setState({ items: myNew });
      }
    };
    getItems();
  }, [myNFT, mySeller, myDate, myNew, state.choose]);

  const setNavigate = () => {
    switch (state.choose) {
      case 1:
        return 'nft/resell'
      case 2:
        return 'nft/buy'
      case 3:
        return 'nft/expired'
      case 4:
        return 'nft/resell'
      default:
        return ''
    }
  }
  const handleClick = (id: number) => () => {
    id !== state.choose && setState({ choose: id });
  };
  const ref = React.useRef<null | HTMLDivElement>(null);
  const onChange = (page: number, pageSize: number) => {
    setState({ page: page, pageSize: pageSize });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  const renderList = () => (
    <>
      {state.items.length > 0 ? (
        state.items
          .slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
          .map((item: any) => (
            <button
              onClick={handleClickItem(item)}
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
        <div className="w-[100%] flex justify-center mt-[50px]">
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
            onClick={handleClick(item.id)}
            key={item.id}
            className={
              state.choose === item.id
                ? "p-[20px] text-[20px] flex items-center justify-center w-[200px] h-[100%] border-[1px] border-b-[0px] border-border rounded-t-[15px]"
                : "p-[20px] text-[20px] flex items-center justify-center w-[200px] h-[calc(100%-20px)] border-[1px] border-border rounded-t-[15px] bg-hover hover:shadow-xl"
            }>
            {item.title}
          </button>
        ))}
        <div className="border-b-[1px] border-border w-[calc(100%-618px)]"></div>
      </div>
      <div className="py-[50px] flex flex-wrap w-[100%] border-[1px] min-h-[680px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl">
        {!loading ? renderList() : renderloading()}
      </div>
    </div>
  );
};

export default ListNFT;

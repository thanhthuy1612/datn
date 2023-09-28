import React from "react";
import ButtonItem from "../../components/button";
import test from "../../assets/logo.png";
import { Empty, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IStateRedux, fetchMarketItemsPast, store } from "../../redux";

interface IState {
  page: number;
  pageSize: number;
}

const OldNFT: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    page: 1,
    pageSize: 8,
  });

  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const ref = React.useRef<null | HTMLDivElement>(null);
  const { past } = useSelector((state: { item: IStateRedux }) => state.item);

  const navigate = useNavigate();

  React.useEffect(() => {
    store.dispatch(fetchMarketItemsPast());
  }, []);
  const handleClick = () => {
    navigate(`nft/buy`);
  };
  const onChange = (page: number, pageSize: number) => {
    setState({ page: page, pageSize: pageSize });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="w-[100%] z-0" ref={ref}>
      <div className="flex h-[70px] items-end w-[100%] mt-[50px]">
        <p className="p-[20px] text-[20px] flex items-center justify-center w-[200px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]">
          Kho NFT
        </p>
        <div className="border-b-[1px] border-border w-[calc(100%-218px)] rounded-[20px]"></div>
      </div>
      <div className="py-[30px] flex flex-wrap w-[100%] border-[2px] border-t-0 rounded-r-[20px] rounded-b-[20px] min-h-[680px] shadow-xl">
        {past && past.length > 0 ? (
          past
            .slice(
              (state.page - 1) * state.pageSize,
              state.page * state.pageSize
            )
            .map((item) => (
              <button
                onClick={handleClick}
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
        {past && past.length > 0 && (
          <div className="w-[100%] flex items-end justify-center mt-[50px]">
            <Pagination
              total={past.length}
              showSizeChanger
              showQuickJumper
              pageSizeOptions={[8, 12, 16, 20]}
              defaultPageSize={8}
              showTotal={(total) => `Tổng ${total} phần tử`}
              onChange={onChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(OldNFT);

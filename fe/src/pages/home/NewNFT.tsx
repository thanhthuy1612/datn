import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Pagination, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonItem from "../../components/button";
import {
  IStateRedux,
  fetchMarketItemsUpComing,
  store
} from "../../redux";

interface IState {
  page: number;
  pageSize: number;
}

const NewNFT: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    page: 1,
    pageSize: 8,
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const ref = React.useRef<null | HTMLDivElement>(null);
  const { upComing, loadingUpComing } = useSelector(
    (state: { item: IStateRedux }) => state.item
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    store.dispatch(fetchMarketItemsUpComing());
  }, []);
  const handleClick = (item: any) => () => {
    navigate(`nft/buy`, { state: item });
  };

  const onChange = (page: number, pageSize: number) => {
    setState({ page: page, pageSize: pageSize });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderList = () => (
    <>
      {upComing && upComing.length > 0 ? (
        upComing
          .slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
          .map((item: any) => (
            <button
              onClick={handleClick(item)}
              className="basis-[25%] min-h-[510px]"
              key={item.tokenId}>
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
      {upComing && upComing.length > 0 && (
        <div className="w-[100%] flex items-end justify-center mt-[50px]">
          <Pagination
            total={upComing ? upComing.length : 0}
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
    <div className="w-[100%] z-0 mt-[60px]" ref={ref}>
      <div className="flex h-[70px] items-end w-[100%]">
        <p className="p-[20px] text-[20px] flex items-center justify-center w-[300px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]">
          NFT mới nhất
        </p>
        <div className="border-b-[1px] border-border w-[calc(100%-318px)] rounded-[20px]"></div>
      </div>
      <div className="py-[50px] flex flex-wrap w-[100%] border-[2px] border-t-0 rounded-r-[20px] min-h-[680px] rounded-b-[20px] shadow-xl">
        {!loadingUpComing ? renderList() : renderloading()}
      </div>
    </div>
  );
};

export default React.memo(NewNFT);

import React from "react";
import ButtonItem from "../../components/button";
import test from "../../assets/logo.png";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  { id: 1, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 2, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 3, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 4, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 5, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 6, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 7, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 8, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 9, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 10, title: "12345", date: "16/12/2001", price: "0.01", img: test },
  { id: 11, title: "12345", date: "16/12/2001", price: "0.01", img: test },
];

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
  const navigate = useNavigate();
  const handleClick = (id: string | number) => () => {
    navigate(`nft/${id as string}`);
  };
  const onChange = (page: number, pageSize: number) => {
    setState({ page: page, pageSize: pageSize });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="w-[100%] z-0" ref={ref}>
      <div className="flex h-[70px] items-end w-[100%] mt-[50px]">
        <div className="p-[20px] text-[20px] flex items-center justify-center w-[200px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]">
          Kho NFT
        </div>
        <div className="border-b-[1px] border-border w-[calc(100%-218px)] rounded-[20px]"></div>
      </div>
      <div className="py-[30px] flex flex-wrap w-[100%] border-[2px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl">
        {items
          .slice((state.page - 1) * state.pageSize, state.page * state.pageSize)
          .map((item) => (
            <button
              onClick={handleClick(item.id)}
              className="basis-[25%]"
              key={item.id}>
              <ButtonItem
                title={item.title}
                date={item.date}
                price={item.price}
                img={item.img}
              />
            </button>
          ))}
        <div className="w-[100%] flex justify-center mt-[50px]">
          <Pagination
            total={items.length}
            showSizeChanger
            showQuickJumper
            pageSizeOptions={[8, 12, 16, 20]}
            defaultPageSize={8}
            showTotal={(total) => `Tổng ${total} phần tử`}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(OldNFT);

import React from "react";
import ButtonItem from "../../components/button";
import test from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

interface IMenu {
  id: number;
  title: string;
}
const menu: IMenu[] = [
  {
    id: 1,
    title: "NFT mới nhất",
  },
  {
    id: 2,
    title: "Kho NFT",
  },
];

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
const TabsHome: React.FC = () => {
  const [choose, setChoose] = React.useState(1);

  const navigate = useNavigate();
  const handleClickButton = (id: string | number) => () => {
    navigate(`nft/${id as string}`);
  };

  const handleClick = (id: number) => () => {
    id !== choose && setChoose(id);
  };
  return (
    <div className="w-[100%] z-0">
      <div className="flex h-[70px] items-end w-[100%] mt-[50px]">
        {menu.map((item) => (
          <button
            onClick={handleClick(item.id)}
            key={item.id}
            className={
              choose === item.id
                ? "p-[20px] text-[20px] flex items-center justify-center w-[200px] h-[100%] border-[2px] border-b-[0px] border-border rounded-t-[15px]"
                : "p-[20px] text-[20px] flex items-center justify-center w-[200px] h-[calc(100%-15px)] border-[1px] border-border rounded-t-[15px] bg-hover hover:shadow-xl"
            }>
            {item.title}
          </button>
        ))}
        <div className="border-b-[1px] border-border w-[calc(100%-400px)]"></div>
      </div>
      <div className="mt-[20px] flex flex-wrap w-[100%]">
        {items.map((item) => (
          <button
            onClick={handleClickButton(item.id)}
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
      </div>
    </div>
  );
};

export default React.memo(TabsHome);

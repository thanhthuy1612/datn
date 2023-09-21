import React from "react";
import ButtonItem from "../../components/button";

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
const TabsHome: React.FC = () => {
  const [choose, setChoose] = React.useState(1);
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
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
        <div className="basis-[25%]">
          <ButtonItem />
        </div>
      </div>
    </div>
  );
};

export default TabsHome;

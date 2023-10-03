import React from "react";
import TableList from "./TableList";
import { getTransfer } from "../../api/tranfer";
import { useSelector } from "react-redux";
import { IStateRedux } from "../../redux";
import { IHistory } from "../../interfaces/IRouter";
import { addressContract } from "../../ultis/addressContract";

interface IMenu {
  id: number;
  title: string;
}
const menu: IMenu[] = [
  {
    id: 1,
    title: "Bán NFT",
  },
  {
    id: 2,
    title: "Mua NFT",
  },
  {
    id: 3,
    title: "Bán lại NFT",
  },
  {
    id: 4,
    title: "Giao dịch trên ví",
  },
];

interface IState {
  choose: number;
  data: IHistory[];
  loading: boolean;
  item: IHistory[];
}

const HistoryTag: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    choose: 1,
    data: [],
    loading: true,
    item: [],
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const { account } = useSelector((state: { item: IStateRedux }) => state.item);

  React.useEffect(() => {
    const fetch = async () => {
      const result = await getTransfer(account?.wallet ?? "");
      const items = result.filter(
        (item: IHistory) =>
          item.functionName ===
            "createToken(string _name, string _symbol, uint256 _preMineSupply, uint256 _maxSupply)" &&
          item.to === addressContract.toLowerCase()
      );
      setState({
        data: result,
        loading: false,
        item: items,
      });
    };
    fetch();
  }, []);
  React.useEffect(() => {
    const fetch = () => {
      switch (state.choose) {
        case 1:
          return state.data.filter(
            (item) =>
              item.functionName ===
                "createToken(string _name, string _symbol, uint256 _preMineSupply, uint256 _maxSupply)" &&
              item.to === addressContract.toLowerCase()
          );
        case 2:
          return state.data.filter(
            (item) =>
              item.functionName === "createMarketSale(uint256 itemId)" &&
              item.to === addressContract.toLowerCase()
          );
        case 3:
          return state.data.filter(
            (item) =>
              item.functionName === "" &&
              item.from === account?.wallet?.toLowerCase() &&
              item.value === "250000000000000" &&
              item.to === addressContract.toLowerCase()
          );
        default:
          return state.data.filter((item) => item);
      }
    };
    const result = fetch();
    setState({ item: result });
  }, [state.choose]);

  const handleClick = (id: number) => () => {
    id !== state.choose && setState({ choose: id });
  };
  const ref = React.useRef<null | HTMLDivElement>(null);
  const renderTable = () => (
    <TableList data={state.item} loading={state.loading} />
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
                ? "p-[20px] text-[20px] flex items-center justify-center w-[250px] h-[100%] border-[1px] border-b-[0px] border-border rounded-t-[15px]"
                : "p-[20px] text-[20px] flex items-center justify-center w-[250px] h-[calc(100%-20px)] border-[1px] border-border rounded-t-[15px] bg-hover hover:shadow-xl"
            }>
            {item.title}
          </button>
        ))}
        <div className="border-b-[1px] border-border w-[calc(100%-1019px)]"></div>
      </div>
      <div className="p-[50px] border-[1px] border-t-0 rounded-r-[20px] rounded-b-[20px] shadow-xl w-[100%]">
        {renderTable()}
      </div>
    </div>
  );
};

export default HistoryTag;

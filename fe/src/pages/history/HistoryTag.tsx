import React from "react";
import TableList from "./TableList";
import { getTransfer } from "../../api/tranfer";
import { useSelector } from "react-redux";
import { IStateRedux } from "../../redux";
import { IHistory } from "../../interfaces/IRouter";

interface IState {
  data: IHistory[];
  loading: boolean;
}

const HistoryTag: React.FC = () => {
  const [state, _setState] = React.useState<IState>({
    data: [],
    loading: true,
  });
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };

  const { account } = useSelector((state: { item: IStateRedux }) => state.item);

  React.useEffect(() => {
    const fetch = async () => {
      const result = await getTransfer(account?.wallet ?? "");
      setState({
        data: result,
        loading: false,
      });
    };
    fetch();
  }, [account?.wallet]);

  return (
    <div className="p-[50px] mt-[50px] border-[1px] rounded-r-[20px] rounded-b-[20px] shadow-xl w-[100%]">
      <TableList data={state.data} loading={state.loading} />
    </div>
  );
};

export default HistoryTag;

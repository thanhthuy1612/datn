import React from "react";
import Tippy from "@tippyjs/react/headless";
import { CiSearch } from "react-icons/ci";
import ListItem from "./ListItem";
import { IAccount } from "../../interfaces/IRouter";

interface IState {
  input?: string;
}

const account: IAccount[] = [
  {
    id: "65042935a7e33c4822f6549d",
    username: "abc",
    wallet: "abc",
    carts: [],
  },
  {
    id: "6507c188c64e88f5761bdea7",
    username: "abcd",
    wallet: "abcd",
    carts: [],
  },
];

const Search: React.FC = () => {
  const [state, _setState] = React.useState<IState>({});
  const setState = (data = {}) => {
    _setState((prevState) => ({ ...prevState, ...data }));
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ input: event.target.value });
  };
  return (
    <Tippy
      interactive
      delay={[0, 5000]}
      className="h-[100%]"
      render={(attrs) => (
        <div tabIndex={-1} {...attrs}>
          <ListItem accounts={account} />
        </div>
      )}>
      <div className="w-[600px] flex items-center relative">
        <input
          value={state.input}
          className="w-[100%] border-[1px] rounded-[15px] border-border p-[10px] bg-[transparent] px-[30px] h-[46px] shadow-md focus:outline-none focus:border-border focus:shadow-xl"
          onChange={handleChange}
          placeholder="Tìm kiếm tài khoản trên ứng dụng"
          spellCheck={false}
        />
        <div className="absolute left-[10px] flex items-center">
          <CiSearch />
        </div>
      </div>
    </Tippy>
  );
};

export default Search;

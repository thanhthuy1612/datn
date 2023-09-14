import React from "react";
import Tippy from "@tippyjs/react/headless";

interface IState {
  input?: string;
}
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
      render={(attrs) => (
        <div {...attrs}>
          <div>1234567</div>
        </div>
      )}>
      <div className="w-[400px] flex items-center">
        <input
          className="w-[100%] bg-[1px] rounded-[15px]"
          value={state.input}
          onChange={handleChange}
          placeholder="Tìm kiếm tài khoản trên ứng dụng"
          spellCheck={false}
        />
      </div>
    </Tippy>
  );
};

export default Search;

import React from "react";
import Tippy from "@tippyjs/react/headless";
import { CiSearch } from "react-icons/ci";
import ListItem from "./ListItem";
import { search } from "../../api/account";

function useDebounce(effect: any, dependencies: any, delay: any) {
  const callback = React.useCallback(effect, dependencies);

  React.useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

const Search: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [blur, setBlur] = React.useState(false);
  const [item, setItem] = React.useState([]);
  const searchRef = React.useRef(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const fetch = async (item = input) => {
    if (item) {
      const result = await search(item);
      setItem(result);
    }
  };
  useDebounce(fetch, [input], 500);
  const handleEnter = async (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await fetch();
    }
  };

  return (
    <Tippy
      interactive
      visible={Boolean(input.length > 0) && blur}
      delay={[0, 5000]}
      className="h-[100%]"
      render={(attrs) => (
        <div tabIndex={-1} {...attrs}>
          <ListItem accounts={item ?? []} title={input} />
        </div>
      )}>
      <div className="w-[600px] flex items-center relative">
        <input
          ref={searchRef}
          value={input}
          onFocus={() => {
            setBlur(true);
          }}
          className="w-[100%] border-[1px] rounded-[15px] border-border p-[10px] bg-[transparent] px-[30px] h-[46px] shadow-md focus:outline-none focus:border-border focus:shadow-xl"
          onChange={handleChange}
          onBlur={() => {
            setBlur(false);
          }}
          onKeyDown={handleEnter}
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

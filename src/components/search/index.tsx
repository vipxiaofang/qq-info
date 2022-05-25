import React from "react";
import "./index.css";

interface SearchProps {
  searchText: string;
  setSearchText: (text: SearchProps["searchText"]) => void;
}

export const Search = (props: SearchProps) => {
  const onChangeText: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    props.setSearchText(evt.target.value);
  };

  return (
    <div className="search">
      <span>QQ</span>
      <input
        type="text"
        value={props.searchText}
        onChange={onChangeText}
        placeholder="请输入5-12位的QQ号"
      />
    </div>
  );
};

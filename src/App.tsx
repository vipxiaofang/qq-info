import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Result } from "components/result";
import { Search } from "components/search";
import { regexQQNumber } from "utils";
import { useDebounce } from "hooks";
import { useFetch } from "hooks/useFetch";
import { fetchGet } from "utils/axios";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const searchDebounce = useDebounce(searchText, 500);
  const searchParams = useMemo(
    () => ({ qq: searchDebounce }),
    [searchDebounce]
  );
  const { data, error, isLoading, run, setError } = useFetch();

  useEffect(() => {
    const judge = regexQQNumber(searchParams.qq);
    if (!judge && searchParams.qq.trim() !== "")
      setError(new Error("请输入合法数据 "));
    if (judge) run(fetchGet("qq.info", searchParams));
  }, [searchParams, setError, run]);

  return (
    <div className="App">
      <h1>QQ号查询</h1>
      {error ? error.message : ""}
      {isLoading ? 1 : 0}
      {data ? JSON.stringify(data) : ""}
      <Search searchText={searchText} setSearchText={setSearchText} />
      <Result />
    </div>
  );
};

export default App;

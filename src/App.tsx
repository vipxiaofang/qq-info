import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Result, Data } from "components/result";
import { Search } from "components/search";
import { regexQQNumber } from "utils";
import { fetchGet } from "utils/axios";
import { useDebounce } from "hooks";
import { useFetch } from "hooks/useFetch";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const searchDebounce = useDebounce(searchText, 500);
  const searchParams = useMemo(
    () => ({ qq: searchDebounce }),
    [searchDebounce]
  );

  const { run, setError, resetIdle, ...rest } = useFetch<Data>();

  useEffect(() => {
    const judge = regexQQNumber(searchParams.qq);
    if (judge) {
      run(fetchGet("qq.info", searchParams));
    } else {
      if (searchParams.qq.trim() === "") {
        resetIdle();
      } else {
        setError(new Error("请输入5-12位的QQ号"));
      }
    }
  }, [searchParams, resetIdle, setError, run]);

  return (
    <div className="App">
      <h1>QQ号查询</h1>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <Result {...rest} />
    </div>
  );
};

export default App;

import React from "react";
import { render, screen } from "@testing-library/react";
import { Result } from "components/result";
import { Search } from "components/search";

test("Components: show success in result", () => {
  const data = {
    name: "一杯敬朝阳。",
    qlogo: "https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=793207918",
    qq: "793207918",
  };

  render(<Result data={data} error={null} isLoading={false} isIdle={false} />);

  const resultElement = screen.getByText(data.name);

  expect(resultElement).toBeInTheDocument();
});

test("Components: show error in result", () => {
  const error = new Error("请输入5-12位的QQ号");

  render(<Result data={null} error={error} isLoading={false} isIdle={false} />);

  const errorElement = screen.getByText(error.message);

  expect(errorElement).toBeInTheDocument();
  expect(errorElement).toHaveClass("error");
});

test("Components: show input value in search", () => {
  const props = {
    searchText: "793207918",
    setSearchText: expect.any(Function),
  };

  render(<Search {...props} />);

  expect(screen.getByPlaceholderText("请输入5-12位的QQ号")).toHaveValue(
    props.searchText
  );
});

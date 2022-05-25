import React from "react";
import "./index.css";

interface QQInfo {
  qq: string;
  name: string;
  qlogo: string;
}

interface ResultProps {
  data: QQInfo | null;
  error: Error | null;
  isLoading: boolean;
  isIdle: boolean;
}

export type Data = ResultProps["data"];

export const Result = ({ data, error, isLoading, isIdle }: ResultProps) => {
  if (isIdle) return null;
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p className="error">{error.message}</p>;

  return (
    <div className="result">
      <img src={data?.qlogo} alt="QQ 头像" />
      <div className="result-info">
        <p>{data?.name}</p>
        <p>{data?.qq}</p>
      </div>
    </div>
  );
};

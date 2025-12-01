import { Spin } from "antd";
import { FC } from "react";

export const CircleLoading:FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Spin size="large" />
    </div>
  )
}
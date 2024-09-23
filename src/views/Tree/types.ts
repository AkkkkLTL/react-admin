import { TreeDataNode } from "antd";

export type TreeNodeType = TreeDataNode & {
  isShow?:boolean;
  children?: TreeNodeType[];
};
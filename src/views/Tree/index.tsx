import { FC } from "react";
import { Tree as AntdTree, Input, TreeDataNode } from "antd";
import useTree from "./useTree";

import "./styles.scss";

const Tree:FC = () => {

  const {
    searchValue, treeData,
    handleInputChange,
  } = useTree();

  return (
    <div className="app-container">
      <Input 
        defaultValue={searchValue}
        onChange={handleInputChange}
      />
      {treeData.length ? (
        <AntdTree
          defaultExpandAll
          treeData={treeData}
        >
        </AntdTree>
      ) : (
        "No Data"
      )}
    </div>
  )
}

export default Tree;
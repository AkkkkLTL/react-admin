import { ChangeEvent, useMemo, useState } from "react";
import { defaultTreeData } from "./constants";
import { TreeNodeType } from "./types";

const useTree = () => {

  const [searchValue, setSearchValue] = useState<string>('');
  const [treeData, setTreeData] = useState<TreeNodeType[]>(defaultTreeData);

  useMemo(() => {

    let newTreeData:TreeNodeType[] = [];
    Object.assign(newTreeData, defaultTreeData);

    const treeFilter = (node:TreeNodeType) => {
      const strTitle = node.title as string;
      const index = strTitle.indexOf(searchValue);
      let showCount = 0;

      if (node.children) {
        node.children.forEach(child => {
          showCount += Number(treeFilter(child));
        })
      }
      node.disabled = !(index > -1 || showCount);
      return Number(index > -1) || showCount;
    }

    newTreeData.map(tree => {
      treeFilter(tree);
    });

    setTreeData(newTreeData);
  }, [searchValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setSearchValue(newValue);
  }


  return {
    searchValue, treeData,
    handleInputChange,
  }
}

export default useTree;
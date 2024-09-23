import { ChangeEvent, useMemo, useState } from "react";
import { defaultTreeData } from "./constants";
import { TreeNodeType } from "./types";

const useTree = () => {

  const [searchValue, setSearchValue] = useState<string>('');
  const [treeData, setTreeData] = useState<TreeNodeType[]>(defaultTreeData);

  const getTreeData = useMemo(() => {

    let newTreeData:TreeNodeType[] = [];
    Object.assign(newTreeData, defaultTreeData);
    
    const loop = (data:TreeNodeType[]) => {

      let showCount:number = 0;

      data.map((item) => {
        const strTitle = item.title as string;
        const index = strTitle.indexOf(searchValue);

        if (item.children) {
          showCount = 0;
          showCount += loop(item.children);
        }
        showCount += Number(index > -1);
        item.disabled = index > -1 || showCount > 0 ? false : true;
      });
      return showCount;
    }

    loop(newTreeData);
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
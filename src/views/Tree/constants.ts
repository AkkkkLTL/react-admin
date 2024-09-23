import { TreeNodeType } from "./types";

export const defaultTreeData:TreeNodeType[] = [
  {
    title: "Level one 1",
    key: 1,
    children: [
      {
        title: "Level two 1-1",
        key: 4,
        children: [
          {
            title: "Level three 1-1-1",
            key: 9
          },
          {
            title: "Level three 1-1-2",
            key: 10
          }
        ]
      }
    ]
  },
  {
    title: "Level one 2",
    key: 2,
    children: [
      {
        title: "Level two 2-1",
        key: 5
      },
      {
        title: "Level two 2-2",
        key: 6
      }
    ]
  },
  {
    title: "Level one 3",
    key: 3,
    children: [
      {
        title: "Level two 3-1",
        key: 7
      },
      {
        title: "Level two 3-2",
        key: 8
      }
    ]
  }
];
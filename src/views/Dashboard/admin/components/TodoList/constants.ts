import { createContext } from "react";
import { ITodo, ITodoListContext } from "./types";
import { nanoid } from "nanoid";

export const STORAGE_KEY = "todos";

const getLocalStorage = ():ITodo[] => {
  const list = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]") as ITodo[];
  return list;
}

const list = getLocalStorage();

export const defaultList:ITodo[] = list.length ? list : [
  { id:nanoid(), text: "star this repository", done: false },
  { id:nanoid(), text: "fork this repository", done: false },
  { id:nanoid(), text: "follow author", done: false },
  { id:nanoid(), text: "vue-element-admin", done: true },
  { id:nanoid(), text: "vue", done: true },
  { id:nanoid(), text: "element-ui", done: true },
  { id:nanoid(), text: "axios", done: true },
  { id:nanoid(), text: "webpack", done: true }
];

export const TodoListContext = createContext<ITodoListContext>({});

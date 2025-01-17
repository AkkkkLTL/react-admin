import { RefObject } from "react";

export interface ITodo {
  id:string;
  text: string;
  done: boolean;
}

export interface ITodoListContext {
  toggleTodo?:(val:ITodo) => void;
  editTodo?: (todo:ITodo, value:ITodo["text"]) => void;
  deleteTodo?: (todo:ITodo) => void;
  todoRef?: RefObject<HTMLInputElement>;
}
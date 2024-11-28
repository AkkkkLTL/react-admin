import { ChangeEvent, ComponentType, FC, FocusEvent, KeyboardEvent, MouseEvent, MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import { ITodo } from "../types";
import { TodoListContext } from "../constants";
import { Input, InputRef } from "antd";

interface IProps {
  todo: ITodo;
}

const Todo:FC<IProps> = (props) => {

  const { 
    todo,
  } = props;

  const inputRef = useRef<InputRef>(null);

  const [editing, setEditing] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(todo.text);

  const context = useContext(TodoListContext);

  const handleOnToggle = () => {
    if (context.toggleTodo)
      context.toggleTodo(todo);
  }

  const handleDoubleClick = () => {
    setEditing(true);
  }

  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      doneEdit(e.currentTarget.value);
    } else if (e.code === "Escape") {
      setInputText(todo.text);
      setEditing(false);
    }
  }

  const handleOnBlur = () => {
    setInputText(todo.text);
    setEditing(false);
  }

  const handleOnChange = (e:ChangeEvent<HTMLInputElement>) => {
    const nextText = e.currentTarget.value;
    setInputText(nextText);
  }

  const handleDelClick = () => {
    if (context.deleteTodo) context.deleteTodo(todo);
  }

  const doneEdit = (value:ITodo["text"]) => {
    const text = value.trim();
    if (!text && context.deleteTodo) {
      context.deleteTodo(todo);
    } else if (editing && context.editTodo) {
      context.editTodo(todo, text);
      setEditing(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [editing]);

  return (
    <li className={`todo${todo.done ? " completed":""}${editing ? " editing":""}`}>
      <div className="view">
        <input 
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={handleOnToggle}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleDelClick} />
      </div>
      {editing && (
        <Input
          defaultValue={inputText}
          className="edit"
          onKeyUp={handleKeyDown}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={inputRef}
        />
      )}
    </li>
  )
}

export default Todo;
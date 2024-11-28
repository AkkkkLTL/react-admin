import { FC, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { STORAGE_KEY, TodoListContext, defaultList } from "./constants";
import { ITodo, ITodoListContext } from "./types";
import Todo from "./Todo";
import "./styles.scss";
import { nanoid } from "nanoid";
import { capitalize, pluralize } from "@/filters";

const TodoList:FC = () => {

  const [todos, setTodos] = useState<ITodo[]>(defaultList);
  const [visibility, setVisibility] = useState<string>("all");

  const todoRef = useRef<HTMLInputElement>(null);

  const filters:object = {
    all: (todos:ITodo[]) => todos,
    active: (todos:ITodo[]) => todos.filter(todo => !todo.done),
    completed: (todos:ITodo[]) => todos.filter(todo => todo.done)
  }

  const setLocalStorage = (todos:ITodo[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  const addTodo = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter") {
      const text = e.currentTarget.value;
      if (text.trim()) {
        const nextTodos = [...todos, {id:nanoid(), text:text.trim(), done: false}];
        setTodos(nextTodos);
        setLocalStorage(nextTodos);
      }
      e.currentTarget.value = '';
    }
  }

  const toggleTodo = (targetTodo:ITodo) => {
    const nextTodos = todos.map(todo => {
      if (todo.id === targetTodo.id) return {
        ...todo,
        done: !targetTodo.done
      }
      return todo;
    });
    setTodos(nextTodos);
    setLocalStorage(nextTodos);
  }

  const deleteTodo = (targetTodo:ITodo) => {
    const nextTodos = todos.filter(todo => todo.id !== targetTodo.id);
    setTodos(nextTodos);
    setLocalStorage(nextTodos);
  }

  const editTodo = (targetTodo:ITodo, value:ITodo["text"]) => {
    const nextTodos = todos.map(todo => {
      if (todo.id === targetTodo.id) return {
        ...todo,
        text: value
      }
      return todo;
    });
    setTodos(nextTodos);
    setLocalStorage(nextTodos);
  }

  const toggleAll = (done:ITodo["done"]) => {

    const nextTodos = todos.map(todo => {
      return {
        ...todo,
        done: done
      }
    })
    setTodos(nextTodos);
    setLocalStorage(nextTodos);
  }

  const allChecked = useMemo(() => {
    return todos.every(todo => todo.done);
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return filters[visibility](todos)
  }, [visibility, todos]);

  const remaining = useMemo(() => {
    return todos.filter(todo => !todo.done).length;
  }, [todos]);

  const context:ITodoListContext = {
    toggleTodo: toggleTodo,
    editTodo: editTodo,
    deleteTodo: deleteTodo,
    todoRef: todoRef
  }

  return (
    <TodoListContext.Provider value={context}>
      <section className="todoapp">
        {/* --- header --- */}
        <header className="header">
          <input className="new-todo" autoComplete="off" placeholder="Todo List" onKeyUp={addTodo} />
        </header>
        {/* --- main section --- */}
        {todos.length && (
          <section className="main">
            <input id="toggle-all" checked={allChecked} className="toggle-all" type="checkbox" onChange={() => toggleAll(!allChecked)} />
            <label htmlFor="toggle-all" />
            <ul className="todo-list">
              {filteredTodos.map((todo:ITodo) => (
                <Todo 
                  todo={todo} 
                  key={todo.id} 
                />
              ))}
            </ul>
          </section>
        )}
        {/* --- footer --- */}
        {todos.length && (
          <footer className="footer">
            <span className="todo-count">
              <strong>{ remaining }</strong>
              { pluralize(remaining, "item") } left
            </span>
            <ul className="filters">
              {Object.keys(filters).map(key => (
                <li key={key}>
                  <a className={`${visibility === key ? "selected":""}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      setVisibility(key);
                    }}
                  >{capitalize(key)}</a>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </section>
    </TodoListContext.Provider>
  )
}

export default TodoList;
import { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import Todo from "./Todo.js";
export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newToDo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
}
function newToDo(name) {
  return { id: Date.now(), name: name, complete: false };
}
function Temp() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function onChangesetName(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={onChangesetName} />
      </form>
      <Link to="/">
        <button>Calculator'</button>
      </Link>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </div>
  );
}

export default Temp;

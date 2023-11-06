import React from "react";
import { ACTIONS } from "./Temp.js";
export default function Todo({ todo, dispatch }) {
  function handleToggle() {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } });
  }
  function handleDelete() {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } });
  }
  return (
    <div>
      <span style={{ color: todo.complete ? "#AAA" : "#000" }}>
        {todo.name}
      </span>
      <button onClick={handleToggle}>Toggle</button>
      <button onClick={handleDelete}>Delete</button>
      <Hel></Hel>
    </div>
  );
}

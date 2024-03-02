import React from "react";

import "./taskFilter.css";

export default function TaskFilter() {
  return (
    <>
      <span className="todo-count">1 items left</span>
      <ul className="filters">
        <li>
          <button className="selected">All</button>
        </li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
      </ul>
      <button className="clear-completed">Clear completed</button>
    </>
  );
}

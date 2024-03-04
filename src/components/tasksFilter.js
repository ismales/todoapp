import React, { Component } from "react";

import "./taskFilter.css";

export default class TaskFilter extends Component {
  render() {
    const { notDoneCount, filterName, selectFilter, clearComplited } = this.props;
    return (
      <>
        <span className="todo-count">{notDoneCount} items left</span>
        <ul className="filters">
          <li>
            <button
              className={filterName === "All" ? "selected" : ""}
              onClick={() => selectFilter("All")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={filterName === "Active" ? "selected" : ""}
              onClick={() => selectFilter("Active")}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={filterName === "Completed" ? "selected" : ""}
              onClick={() => selectFilter("Completed")}
            >
              Completed
            </button>
          </li>
        </ul>
        <button className="clear-completed" onClick={clearComplited}>
          Clear completed
        </button>
      </>
    );
  }
}

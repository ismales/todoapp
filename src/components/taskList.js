import React from "react";
import Task from "./task";

import "./taskList.css";

export default function TaskList() {
  return (
    <div className="todo-list">
      <Task className="completed" text="Completed task" />
      <Task className="editing" text="Editing task" />
      <Task text="New task" />
    </div>
  );
}

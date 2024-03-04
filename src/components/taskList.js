import React, { Component } from "react";
import Task from "./task";

import "./taskList.css";

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone } = this.props;
    return (
      <div className="todo-list">
        {todos?.map((task) => (
          <Task
            key={task.id}
            text={task.text}
            done={task.done}
            onDeleted={() => onDeleted(task.id)}
            onToggleDone={() => onToggleDone(task.id)}
          />
        ))}
      </div>
    );
  }
}

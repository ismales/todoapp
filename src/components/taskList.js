import React, { Component } from "react";
import Task from "./task";
import PropTypes from "prop-types";

import "./taskList.css";

export default class TaskList extends Component {
  static defaultProps = {
    tasks: [],
  };

  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
  };

  render() {
    const { tasks, onDeleted, onToggleDone } = this.props;
    return (
      <div className="todo-list">
        {tasks?.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDeleted={() => onDeleted(task.id)}
            onToggleDone={() => onToggleDone(task.id)}
          />
        ))}
      </div>
    );
  }
}

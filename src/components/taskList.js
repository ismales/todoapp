import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './task';

import './taskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDeleted, onToggleDone, onEditName, saveTime } = this.props;
    return (
      <div className="todo-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDeleted={() => onDeleted(task.id)}
            onToggleDone={() => onToggleDone(task.id)}
            onEditName={onEditName}
            saveTime={saveTime}
          />
        ))}
      </div>
    );
  }
}

TaskList.defaultProps = {
  tasks: [],
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  saveTime: PropTypes.func.isRequired,
};

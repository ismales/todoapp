import React from 'react';
import PropTypes from 'prop-types';

import Task from './task';

import './taskList.css';

export default function TaskList({ tasks, onDeleted, onToggleDone, onEditName, startTimer, stopTimer }) {
  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleted={() => onDeleted(task.id)}
          onToggleDone={() => onToggleDone(task.id)}
          onEditName={onEditName}
          startTimer={startTimer}
          stopTimer={stopTimer}
        />
      ))}
    </div>
  );
}

TaskList.defaultProps = {
  tasks: [],
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import EditForm from './editForm';

import './task.css';

export default function Task({ task, onDeleted, onToggleDone, onEditName, startTimer, stopTimer }) {
  const { id, text, done, min, sec, isActive, createdTime } = task;

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (done) stopTimer(id);
  }, [isActive, done]);

  const onTimerPlay = () => {
    if (!isActive && !done) {
      startTimer(id, min, sec);
    }
  };

  const onTimerPause = () => {
    stopTimer(id);
  };

  const taskItem = () => {
    if (done) return 'completed';
    if (isEditing) return 'editing';
    return '';
  };

  const taskInfoView = () => {
    if (isEditing && !done) return 'hidden';
    return '';
  };

  return (
    <li key={id} className={taskItem()}>
      <div className={taskInfoView()}>
        <input
          id={id}
          name="toggle"
          className="toggle"
          type="checkbox"
          onChange={() => onToggleDone(id)}
          checked={done}
        />
        <label htmlFor={id}>
          <span className="description">{text}</span>
          <span className="task-timer">
            <button type="button" aria-label="Play" className="icon-play icon-hover" onClick={onTimerPlay} />
            <button type="button" aria-label="Pause" className="icon-pause icon-hover" onClick={onTimerPause} />
            {`${min}`.padStart(2, '0')}:{`${sec}`.padStart(2, '0')}
          </span>
          <span className="created">
            created {formatDistanceToNow(new Date(createdTime), { includeSeconds: true })}
          </span>
          <div className="task-buttons">
            <button
              type="button"
              aria-label="Edit"
              className="icon icon-edit icon-hover"
              onClick={() => setIsEditing(true)}
            />
            <button
              type="button"
              aria-label="Destoy"
              className="icon icon-destroy icon-hover"
              onClick={() => onDeleted(id)}
            />
          </div>
        </label>
      </div>
      {isEditing ? (
        <EditForm id={id} text={text} onEditName={onEditName} closeEditForm={() => setIsEditing(false)} />
      ) : null}
    </li>
  );
}

Task.defaultProps = {
  task: {
    done: false,
    createdTime: new Date(),
  },
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    min: PropTypes.number,
    sec: PropTypes.number,
    done: PropTypes.bool,
    isActive: PropTypes.bool,
    createdTime: PropTypes.instanceOf(Date),
  }),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import EditForm from './editForm';

import './task.css';

export default function Task({ task, onDeleted, onToggleDone, onEditName, saveTime }) {
  const { id, text, done, createdTime, min, sec } = task;

  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [minutes, setMinutes] = useState(+min);
  const [seconds, setSeconds] = useState(+sec);
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (isActive && !done) {
      timerIdRef.current = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(timerIdRef.current);
        } else if (seconds === 0) {
          setMinutes((m) => m - 1);
          setSeconds(59);
        } else {
          setSeconds((s) => s - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerIdRef.current);
    };
  }, [isActive, minutes, seconds]);

  const onTimerPlay = () => {
    if (done) return;
    setIsActive(true);
  };

  const onTimerPause = () => {
    setIsActive(false);
    saveTime(id, minutes, seconds);
  };

  const taskItem = () => {
    if (done) return 'completed';
    if (isEditing) return 'editing';
    return '';
  };

  const taskInfoView = () => {
    if (isEditing) return 'hidden';
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
            {`${minutes}`.padStart(2, '0')}:{`${seconds}`.padStart(2, '0')}
          </span>
          <span className="created">
            created {createdTime ? formatDistanceToNow(new Date(createdTime), { includeSeconds: true }) : 'just now'}{' '}
            ago
          </span>
          <div className="task-buttons">
            <button
              type="button"
              aria-label="Edit"
              className="icon icon-edit icon-hover"
              onClick={() => setIsEditing(true)}
            />
            <button type="button" aria-label="Destoy" className="icon icon-destroy icon-hover" onClick={onDeleted} />
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
    createdTime: PropTypes.instanceOf(Date),
  }),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  saveTime: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import EditForm from './editForm';

import './task.css';

export default class Task extends Component {
  state = {
    isEditing: false,
    isActive: true,
    min: 0,
    sec: 0,
    timerID: 0,
  };

  componentDidMount() {
    const { task } = this.props;
    const { min, sec } = task;
    this.setState({
      min,
      sec,
    });
  }

  componentDidUpdate() {
    const { min, sec, timerID } = this.state;
    if (+min !== 0 && +sec === -1) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((prevState) => ({
        min: prevState.min - 1,
        sec: 59,
      }));
    }
    if (+min === 0 && +sec === -1) {
      clearInterval(timerID);
    }
  }

  onEdit = () => {
    this.setState({ isEditing: true });
  };

  onTimerPlay = () => {
    const { isActive } = this.state;
    if (isActive) {
      const newTimerID = setInterval(() => {
        this.setState((prevState) => ({
          sec: prevState.sec - 1,
        }));
      }, 1000);
      this.setState({ isActive: false, timerID: newTimerID });
    }
  };

  onTimerPause = () => {
    const { task, saveTime } = this.props;
    const { id } = task;
    const { min, sec, timerID } = this.state;
    clearInterval(timerID);
    saveTime(id, min, sec, timerID);
    this.setState({ isActive: true, min, sec });
  };

  closeEditForm = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const { min, sec, isEditing } = this.state;
    const { task, onDeleted, onToggleDone, onEditName } = this.props;
    const { id, text, done, createdTime } = task;
    let taskItem = '';
    let view = '';
    let checked = false;

    if (done) {
      taskItem += ' completed';
      checked = true;
    }

    if (isEditing) {
      taskItem += ' editing';
      view += ' hidden';
    }

    return (
      <li key={id} className={taskItem}>
        <div className={view}>
          <input id={id} name="toggle" className="toggle" type="checkbox" onChange={onToggleDone} checked={checked} />
          <label htmlFor={id}>
            <span className="description">{text}</span>
            <span className="task-timer">
              <button
                type="button"
                aria-label="Play"
                className="icon-play icon-hover"
                disabled={done}
                onClick={this.onTimerPlay}
              />
              <button type="button" aria-label="Pause" className="icon-pause icon-hover" onClick={this.onTimerPause} />
              {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
            </span>
            <span className="created">created {formatDistanceToNow(createdTime, { includeSeconds: true })} ago</span>
            <div className="task-buttons">
              <button type="button" aria-label="Edit" className="icon icon-edit icon-hover" onClick={this.onEdit} />
              <button type="button" aria-label="Destoy" className="icon icon-destroy icon-hover" onClick={onDeleted} />
            </div>
          </label>
        </div>
        {isEditing ? <EditForm id={id} text={text} onEditName={onEditName} closeEditForm={this.closeEditForm} /> : null}
      </li>
    );
  }
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
    timerID: PropTypes.number,
    done: PropTypes.bool,
    createdTime: PropTypes.instanceOf(Date),
  }),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  saveTime: PropTypes.func.isRequired,
};

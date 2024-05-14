/* eslint-disable prefer-template */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  state = {
    timerID: null,
    min: 0,
    sec: 0,
  };

  componentDidUpdate() {
    const { sec } = this.state;
    if (+sec === 60) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState((prevState) => ({
        min: prevState.min + 1,
        sec: 0,
      }));
    }
  }

  onTimerPlay = () => {
    this.state.timerID = setInterval(() => {
      this.setState((prevState) => ({
        sec: prevState.sec + 1,
      }));
    }, 1000);
  };

  onTimerPause = () => {
    const { timerID } = this.state;
    clearInterval(timerID);
  };

  render() {
    const { min, sec } = this.state;
    const { task, onDeleted, onToggleDone } = this.props;
    const { id, text, done, createdTime } = task;
    let classNames = '';
    let checked = false;
    if (done) {
      classNames += ' completed';
      checked = true;
      this.onTimerPause();
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleDone} checked={checked} />
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
              {min < 10 ? '0' + min : min}:{sec < 10 ? '0' + sec : sec}
            </span>
            <span className="created">created {formatDistanceToNow(createdTime, { includeSeconds: true })} ago</span>
            <div className="task-buttons">
              <button type="button" aria-label="Edit" className="icon icon-edit icon-hover" />
              <button type="button" aria-label="Destoy" className="icon icon-destroy icon-hover" onClick={onDeleted} />
            </div>
          </label>
        </div>
        <input type="text" className="edit" defaultValue={text} />
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
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool,
    createdTime: PropTypes.instanceOf(Date),
  }),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};

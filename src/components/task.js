import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  render() {
    const { task, onDeleted, onToggleDone } = this.props;
    const { id, text, done, createdTime } = task;
    let classNames = '';
    let checked = false;
    if (done) {
      classNames += ' completed';
      checked = true;
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" onChange={onToggleDone} checked={checked} />
          <label htmlFor={id}>
            <span className="description">{text}</span>
            <span className="created">created {formatDistanceToNow(createdTime, { includeSeconds: true })} ago</span>
          </label>
          <button type="button" aria-label="Edit" className="icon icon-edit" />
          <button type="button" aria-label="Destoy" className="icon icon-destroy" onClick={onDeleted} />
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

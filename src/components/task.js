import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";

import "./task.css";

export default class Task extends Component {
  static defaultProps = {
    task: {
      done: false,
      createdTime: new Date(),
    },
  };

  render() {
    const { task, onDeleted, onToggleDone } = this.props;
    const { id, text, done, createdTime } = task;
    let classNames = "";
    let checked = false;
    if (done) {
      classNames += " completed";
      checked = true;
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={checked} />
          <label>
            <span className="description">{text}</span>
            <span className="created">
              created {formatDistanceToNow(createdTime, { includeSeconds: true })} ago
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue={text} />
      </li>
    );
  }
}

import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
  render() {
    const { id, text, done, onDeleted, onToggleDone } = this.props;
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
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue={text} />
      </li>
    );
  }
}

import React, { Component } from "react";

import "./task.css";

export default class Task extends Component {
  state = {
    done: false,
  };

  onCheckboxPress = () => {
    this.setState(({ done }) => {
      return { done: !done };
    });
  };

  render() {
    const { id, text, onDeleted } = this.props;
    const { done } = this.state;
    let classNames = "";
    if (done) {
      classNames += " completed";
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={this.onCheckboxPress} />
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

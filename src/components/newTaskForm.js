import React, { Component } from "react";

import "./newTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    text: "",
  };

  changeInputValue = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  submitTask = (event) => {
    const { onTaskAdded } = this.props;
    event.preventDefault();
    onTaskAdded(this.state.text);
    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <form className="header" onSubmit={this.submitTask}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done"
          onChange={this.changeInputValue}
          value={this.state.text}
        />
      </form>
    );
  }
}

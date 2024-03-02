import React, { Component } from "react";

import "./newTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    text: "",
  };

  debounce = (fn, debounceTime) => {
    let timeout;
    return function () {
      const fncall = () => {
        fn.apply(this, arguments);
      };
      clearTimeout(timeout);
      timeout = setTimeout(fncall, debounceTime);
    };
  };

  changeInputValue = (event) => {
    console.log(event.target.value);
    this.setState(() => {
      return {
        text: event.target.value,
      };
    });
  };

  handleKeyDown = (event) => {
    const { onTaskAdded } = this.props;
    if (event.key === "Enter") {
      event.preventDefault();
      onTaskAdded(this.state.text);
      event.target.value = "";
    }
  };

  render() {
    return (
      <form className="header">
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done"
          onChange={this.debounce(this.changeInputValue, 350)}
          onKeyDown={this.handleKeyDown}
        />
      </form>
    );
  }
}

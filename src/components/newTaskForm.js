import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './newTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    text: '',
  };

  changeInputValue(event) {
    this.setState({
      text: event.target.value,
    });
  }

  submitTask(event) {
    const { text } = this.state;
    const { onTaskAdded } = this.props;
    event.preventDefault();
    onTaskAdded(text);
    this.setState({
      text: '',
    });
  }

  render() {
    const { text } = this.state;
    return (
      <form className="header" onSubmit={this.submitTask}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done"
          onChange={this.changeInputValue}
          value={text}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './newTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    text: '',
    min: '',
    sec: '',
  };

  setText = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  setMin = (e) => {
    this.setState({
      min: +e.target.value,
    });
  };

  setSec = (e) => {
    this.setState({
      sec: +e.target.value,
    });
  };

  submitTask = (event) => {
    const { text, min, sec } = this.state;
    const { onTaskAdded } = this.props;
    event.preventDefault();
    onTaskAdded(text, min, sec);
    this.setState({
      text: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { text, min, sec } = this.state;
    return (
      <form id="new-todo-form" className="new-todo-form" onSubmit={this.submitTask}>
        <input
          name="new-todo"
          className="new-todo"
          type="text"
          placeholder="What needs to be done"
          onChange={this.setText}
          value={text}
        />
        <input
          name="new-todo-timer"
          className="new-todo-form__timer"
          type="number"
          onChange={this.setMin}
          value={min}
          placeholder="Min"
        />
        <input
          name="new-todo-timer"
          className="new-todo-form__timer"
          type="number"
          onChange={this.setSec}
          value={sec}
          placeholder="Sec"
        />
        <button type="submit" aria-label="submit" />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

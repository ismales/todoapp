/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './editForm.css';

export default class EditForm extends Component {
  state = {
    newText: '',
  };

  componentDidMount() {
    document.addEventListener('click', this.noSaveEditTask, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.noSaveEditTask, true);
  }

  changeInputValue = (event) => {
    const newText = event.target.value;
    this.setState({
      newText,
    });
  };

  saveEditTask = (e) => {
    e.preventDefault();
    const { id, onEditName, closeEditForm } = this.props;
    const { newText } = this.state;
    onEditName(id, newText);
    closeEditForm();
  };

  noSaveEditTask = (e) => {
    const { closeEditForm } = this.props;
    const editInput = document.querySelector('.edit');
    if (e.target !== editInput || e.keyCode === 27) {
      closeEditForm();
    }
  };

  render() {
    const { text } = this.props;

    return (
      <form id="edit-form" onSubmit={this.saveEditTask}>
        <input
          type="text"
          name="edit-input"
          className="edit"
          defaultValue={text}
          onChange={this.changeInputValue}
          onKeyDown={this.noSaveEditTask}
        />
      </form>
    );
  }
}

EditForm.defaultProps = {};

EditForm.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onEditName: PropTypes.func.isRequired,
  closeEditForm: PropTypes.func.isRequired,
};

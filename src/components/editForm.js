/* eslint-disable class-methods-use-this */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './editForm.css';

export default function EditForm({ id, text, onEditName, closeEditForm }) {
  const [newText, setNewText] = useState('');

  const noSaveEditTask = (e) => {
    const editInput = document.querySelector('.edit');
    if (e.target !== editInput || e.keyCode === 27) {
      closeEditForm();
    }
  };

  useEffect(() => {
    document.addEventListener('click', noSaveEditTask, true);
    return () => document.removeEventListener('click', noSaveEditTask, true);
  }, []);

  const changeInputValue = (e) => {
    setNewText(e.target.value);
  };

  const saveEditTask = (e) => {
    e.preventDefault();
    onEditName(id, newText);
    closeEditForm();
  };

  return (
    <form id="edit-form" onSubmit={saveEditTask}>
      <input
        type="text"
        name="edit-input"
        className="edit"
        defaultValue={text}
        onChange={changeInputValue}
        onKeyDown={noSaveEditTask}
      />
    </form>
  );
}

EditForm.defaultProps = {};

EditForm.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onEditName: PropTypes.func.isRequired,
  closeEditForm: PropTypes.func.isRequired,
};

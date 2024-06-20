import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './newTaskForm.css';

export default function NewTaskForm({ onTaskAdded }) {
  const [text, setText] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const submitTask = (e) => {
    e.preventDefault();
    onTaskAdded(text, +min, +sec);
    setText('');
    setMin('');
    setSec('');
  };

  return (
    <form id="new-todo-form" className="new-todo-form" onSubmit={submitTask}>
      <input
        name="new-todo"
        className="new-todo"
        type="text"
        placeholder="What needs to be done"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <input
        name="new-todo-timer"
        className="new-todo-form__timer"
        type="number"
        onChange={(e) => setMin(+e.target.value)}
        value={min}
        placeholder="Min"
      />
      <input
        name="new-todo-timer"
        className="new-todo-form__timer"
        type="number"
        onChange={(e) => setSec(+e.target.value)}
        value={sec}
        placeholder="Sec"
      />
      <button type="submit" aria-label="submit" />
    </form>
  );
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

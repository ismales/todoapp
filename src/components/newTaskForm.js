import React from "react";

import "./newTaskForm.css";

export default function NewTaskForm() {
  return (
    <form className="header">
      <input className="new-todo" type="text" placeholder="What needs to be done" />
    </form>
  );
}

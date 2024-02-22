import React from "react";

import "./task.css";

export default function Task({ className, text }) {
  return (
    <li className={className}>
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>
          <span class="description">{text}</span>
          <span class="created">created 17 seconds ago</span>
        </label>
        <button class="icon icon-edit"></button>
        <button class="icon icon-destroy"></button>
      </div>
      <input type="text" class="edit" value="Editing task" />
    </li>
  );
}

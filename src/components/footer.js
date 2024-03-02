import React, { Component } from "react";
import TaskFilter from "./tasksFilter";

import "./footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <TaskFilter />
      </div>
    );
  }
}

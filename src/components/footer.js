import React, { Component } from "react";
import TaskFilter from "./tasksFilter";

import "./footer.css";

export default class Footer extends Component {
  static defaultProps = {
    filterName: "All",
  };

  render() {
    const { notDoneCount, filterName, selectFilter, clearComplited } = this.props;
    return (
      <div className="footer">
        <TaskFilter
          notDoneCount={notDoneCount}
          filterName={filterName}
          selectFilter={selectFilter}
          clearComplited={clearComplited}
        />
      </div>
    );
  }
}

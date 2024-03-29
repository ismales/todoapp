import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TaskFilter from './tasksFilter';

import './footer.css';

export default class Footer extends Component {
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

Footer.defaultProps = {
  filterName: 'All',
};

Footer.propTypes = {
  notDoneCount: PropTypes.number.isRequired,
  filterName: PropTypes.string,
  selectFilter: PropTypes.func.isRequired,
  clearComplited: PropTypes.func.isRequired,
};

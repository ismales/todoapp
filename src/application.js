import React, { Component } from 'react';

import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';
import Footer from './components/footer';

import './application.css';

export default class Application extends Component {
  state = {
    tasks: [],
    filterName: 'All',
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const task = tasks[idx];
      const newTask = { ...task, done: !task.done };
      const newTasks = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
      return {
        tasks: newTasks,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newTasks = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
      return { tasks: newTasks };
    });
  };

  addTask = (text) => {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, { id: Math.random(), text, done: false, createdTime: new Date() }],
    }));
  };

  selectFilter = (filterName) => {
    this.setState(() => {
      const newValue = filterName;
      return { filterName: newValue };
    });
  };

  filteredTasks = (tasks, filterName) => {
    switch (filterName) {
      case 'Active':
        return tasks.filter((task) => !task.done);
      case 'Completed':
        return tasks.filter((task) => task.done);
      default:
        return tasks;
    }
  };

  clearComplited = () => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((el) => el.done === false);

      return {
        tasks: newTasks,
      };
    });
  };

  render() {
    const { tasks, filterName } = this.state;

    const notDoneCount = tasks.length - tasks.filter((task) => task.done).length;
    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.filteredTasks(tasks, filterName)}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            notDoneCount={notDoneCount}
            filterName={filterName}
            selectFilter={this.selectFilter}
            clearComplited={this.clearComplited}
          />
        </section>
      </section>
    );
  }
}

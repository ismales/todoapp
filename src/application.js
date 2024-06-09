import React, { Component } from 'react';

import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';
import Footer from './components/footer';

import './application.css';

export default class Application extends Component {
  id = 1;

  state = {
    tasks: [],
    filterName: 'All',
  };

  onTaskAdded = (text, min, sec) => {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, { id: this.id++, text, min, sec, timerID: 0, done: false, createdTime: new Date() }],
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const task = tasks[idx];
      const newTask = { ...task, done: !task.done };
      const newTasks = [...tasks.slice(0, idx), newTask, ...tasks.slice(idx + 1)];
      return { tasks: newTasks };
    });
  };

  onDeleted = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newTasks = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];
      return { tasks: newTasks };
    });
  };

  onEditName = (id, text) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const task = tasks[idx];
      const editTimeTask = { ...task, text };
      const newTasks = [...tasks.slice(0, idx), editTimeTask, ...tasks.slice(idx + 1)];
      return { tasks: newTasks };
    });
  };

  saveTime = (id, min, sec, timerID) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const task = tasks[idx];
      const newTimeTask = { ...task, min, sec, timerID };
      const newTasks = [...tasks.slice(0, idx), newTimeTask, ...tasks.slice(idx + 1)];
      return { tasks: newTasks };
    });
  };

  selectFilter = (filterName) => {
    this.setState({ filterName });
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
      return { tasks: newTasks };
    });
  };

  render() {
    const { tasks, filterName } = this.state;
    const notDoneCount = tasks.length - tasks.filter((task) => task.done).length;
    return (
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.onTaskAdded} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.filteredTasks(tasks, filterName)}
            onDeleted={this.onDeleted}
            onToggleDone={this.onToggleDone}
            onEditName={this.onEditName}
            saveTime={this.saveTime}
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

import React, { Component } from "react";

import NewTaskForm from "./components/newTaskForm";
import TaskList from "./components/taskList";
import Footer from "./components/footer";

import "./app.css";

export default class App extends Component {
  state = {
    tasks: [
      { id: 1, text: "Completed task", done: false },
      { id: 2, text: "Editing task", done: false },
      { id: 3, text: "New task", done: false },
    ],
    filterName: "All",
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
      tasks: [...tasks, { id: tasks.length + 1, text }],
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
      case "Active":
        return tasks.filter((task) => !task.done);
      case "Completed":
        return tasks.filter((task) => task.done);
      default:
        return tasks;
    }
  };

  clearComplited = () => {
    this.setState(() => {
      const complitedTasks = this.filteredTasks(this.state.tasks, "Completed");
      return complitedTasks.map((task) => this.deleteTask(task.id));
    });
  };

  render() {
    const { tasks, filterName } = this.state;

    const notDoneCount = tasks.length - tasks.filter((task) => task.done).length;
    return (
      <>
        <section className="todoapp">
          <header>
            <h1>todos</h1>
            <NewTaskForm onTaskAdded={this.addTask} />
          </header>
          <section className="main">
            <TaskList
              todos={this.filteredTasks(tasks, filterName)}
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
      </>
    );
  }
}

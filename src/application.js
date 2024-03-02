import React, { Component } from "react";

import NewTaskForm from "./components/newTaskForm";
import TaskList from "./components/taskList";
import Footer from "./components/footer";

import "./application.css";

export default class App extends Component {
  state = {
    tasks: [
      { id: 1, text: "Completed task" },
      { id: 2, text: "Editing task" },
      { id: 3, text: "New task" },
    ],
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

  render() {
    return (
      <>
        <section className="todoapp">
          <header>
            <h1>todos</h1>
            <NewTaskForm onTaskAdded={this.addTask} />
          </header>
          <section className="main">
            <TaskList todos={this.state.tasks} onDeleted={this.deleteTask} />
            <Footer />
          </section>
        </section>
      </>
    );
  }
}

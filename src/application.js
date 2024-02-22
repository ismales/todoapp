import React from "react";

import NewTaskForm from "./components/newTaskForm";
import TaskList from "./components/taskList";
import Footer from "./components/footer";

import "./application.css";

export default function App() {
  return (
    <body>
      <section className="todoapp">
        <header>
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </section>
    </body>
  );
}

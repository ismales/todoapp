import React, { useState, useEffect, useCallback } from 'react';

import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';
import Footer from './components/footer';

import './application.css';

export default function Application() {
  const [taskID, setTaskID] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [filterName, setFilterName] = useState('All');

  useEffect(() => {}, [tasks]);

  const onTaskAdded = (text, min, sec) => {
    setTasks((prevTasks) => [...prevTasks, { id: taskID, text, min, sec, done: false, createdTime: new Date() }]);
    setTaskID((id) => id + 1);
  };

  const onToggleDone = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  }, []);

  const onDeleted = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const onEditName = useCallback((id, text) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, text } : task)));
  }, []);

  const saveTime = useCallback((id, min, sec) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, min, sec } : task)));
  }, []);

  const selectFilter = (name) => {
    setFilterName(name);
  };

  const filteredTasks = (name) => {
    switch (name) {
      case 'Active':
        return tasks.filter((task) => !task.done);
      case 'Completed':
        return tasks.filter((task) => task.done);
      default:
        return tasks;
    }
  };

  const clearComplited = () => {
    setTasks((prevTasks) => prevTasks.filter((el) => el.done === false));
  };

  const notDoneCount = tasks.length - tasks.filter((task) => task.done).length;

  return (
    <section className="todoapp">
      <header>
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={onTaskAdded} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks(filterName)}
          onDeleted={onDeleted}
          onToggleDone={(id) => onToggleDone(id)}
          onEditName={onEditName}
          saveTime={saveTime}
        />
        <Footer
          notDoneCount={notDoneCount}
          filterName={filterName}
          selectFilter={selectFilter}
          clearComplited={clearComplited}
        />
      </section>
    </section>
  );
}

import React, { useState, useEffect, useCallback, useRef } from 'react';

import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';
import Footer from './components/footer';

import './application.css';

export default function Application() {
  const taskID = useRef(1);
  const [tasks, setTasks] = useState([]);
  const [filterName, setFilterName] = useState('All');
  const timersRef = useRef({});
  const remainingTimeRef = useRef({});

  useEffect(() => {}, [tasks]);

  const onTaskAdded = (text, min, sec) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: taskID.current, text, min, sec, done: false, createdTime: new Date(), isActive: false },
    ]);
    taskID.current++;
  };

  const onToggleDone = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  }, []);

  const onDeleted = useCallback((id) => {
    clearInterval(timersRef.current[id]);
    delete timersRef.current[id];
    delete remainingTimeRef.current[id];
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const onEditName = useCallback((id, text) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, text } : task)));
  }, []);

  const saveTime = useCallback((id, min, sec) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, min, sec } : task)));
  }, []);

  const startTimer = (id, initialMinutes, initialSeconds) => {
    const startTime = Date.now();
    const remainingSeconds =
      remainingTimeRef.current[id] !== undefined ? remainingTimeRef.current[id] : initialMinutes * 60 + initialSeconds;

    timersRef.current[id] = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const totalRemainingSeconds = remainingSeconds - Math.floor(elapsedTime / 1000);
      const newMinutes = Math.floor(totalRemainingSeconds / 60);
      const newSeconds = totalRemainingSeconds % 60;

      if (totalRemainingSeconds <= 0) {
        clearInterval(timersRef.current[id]);
        saveTime(id, 0, 0);
        delete remainingTimeRef.current[id];
      } else {
        saveTime(id, newMinutes, newSeconds);
      }
    }, 1000);

    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isActive: true } : task)));
  };

  const stopTimer = (id) => {
    clearInterval(timersRef.current[id]);
    delete timersRef.current[id];
    const pausedTask = tasks.find((el) => el.id === id);
    remainingTimeRef.current[id] = pausedTask.min * 60 + pausedTask.sec;
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isActive: false } : task)));
  };

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
    setTasks((prevTasks) => prevTasks.filter((el) => !el.done));
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
          startTimer={startTimer}
          stopTimer={stopTimer}
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

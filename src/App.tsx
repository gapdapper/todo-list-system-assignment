import { useState } from "react";
import "./App.css";
import TaskCard from "./components/TaskCard";
import type { ITask } from "./types/Task";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const addTask = (): void => {
    if (newTask.trim() === "") return;
    const task: ITask = {
      id: Date.now(),
      task: newTask,
      isDone: false,
    };
    setTaskList((prev) => [...prev, task]);
    setNewTask("");
  };

  const setDone = (id: number) => {
    setTaskList((prev) =>
      prev.map((t) => {
        const task =
          id === t.id
            ? {
                ...t,
                isDone: !t.isDone,
              }
            : t;
        return task;
      }),
    );
  };

  const saveEditTask = (id: number, updatedTask: string) => {
    setTaskList((prev) =>
      prev.map((t) => {
        const task =
          id === t.id
            ? {
                ...t,
                task: updatedTask,
              }
            : t;
        return task;
      }),
    );
  };

  const removeTask = (id: number) => {
    setTaskList((prev) =>
      prev.filter((task) => {
        return task.id != id;
      }),
    );
  };

  return (
    <div className="container">
      <div className="main-content">
        <h2>Todo List System</h2>
        <div className="input-section">
          <input
            type="text"
            name="task-input"
            className="task-input"
            value={newTask}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addTask();
            }}
          >
            Add Task
          </button>
        </div>
        <div className="task-list">
          {taskList.length != 0 &&
            taskList.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  setDone={setDone}
                  removeTask={removeTask}
                  saveEditTask={saveEditTask}
                  id={task.id}
                  task={task.task}
                  isDone={task.isDone}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

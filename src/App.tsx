import { useEffect, useState } from "react";
import "./App.css";
import TaskCard from "./components/TaskCard";
import type { ITask, ITaskResponse } from "./types/Task";
import SearchDocumentIcon from "./assets/search-document-icon.svg";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "./services/todoApi";
import TodoSkeleton from "./components/TodoSkeleton";
import FilterSection from "./components/FilterSection";
import type { FilterType } from "./types/Filter";
import useFilteredTasks from "./hooks/useFilteredTasks";

function App() {
  // tasks manipulate states
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filter states
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredTaskList = useFilteredTasks(
    taskList,
    searchKeyword,
    activeFilter,
  );

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);

        const data = await getTodos();

        const mappedTodos = data.map((todo: ITaskResponse) => ({
          id: todo.id,
          task: todo.title,
          isDone: todo.completed,
        }));

        setTaskList(mappedTodos);
      } catch {
        setError("Failed to load todo list");
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const addTask = async () => {
    if (newTask.trim() === "") return;

    try {
      setIsSubmitting(true);

      await createTodo(newTask);

      const task: ITask = {
        id: Date.now(),
        task: newTask,
        isDone: false,
      };
      setTaskList((prev) => [...prev, task]);
      setNewTask("");
      setError("");
    } catch {
      setError("Failed to add new todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTaskStatus = async (id: number, isDone: boolean) => {
    try {
      setIsSubmitting(true);

      await toggleTodo(id, isDone);

      setTaskList((prev) =>
        prev.map((t) =>
          id === t.id
            ? {
                ...t,
                isDone: isDone,
              }
            : t,
        ),
      );
      setError("");
    } catch {
      setError("Failed to set done todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveEditTask = async (id: number, updatedTask: string) => {
    try {
      setIsSubmitting(true);

      await updateTodo(id, updatedTask);

      setTaskList((prev) =>
        prev.map((t) =>
          id === t.id
            ? {
                ...t,
                task: updatedTask,
              }
            : t,
        ),
      );

      setError("");
    } catch {
      setError("Failed to edit task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setIsSubmitting(true);
      await deleteTodo(id);

      setTaskList((prev) => prev.filter((task) => task.id !== id));
      setError("");
    } catch {
      setError("Failed to delete task");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <TodoSkeleton numberOfCard={6} />;
  }

  return (
    <div className="container">
      <div className="main-section">
        <h1 className="header">Todo List System</h1>
        <div className="input-section">
          <input
            type="text"
            name="task-input"
            className="task-input"
            placeholder="Add new task"
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
            className="add-button"
            disabled={newTask.trim() === "" || isSubmitting}
            onClick={() => {
              addTask();
            }}
          >
            <i className="fa-solid fa-plus"></i>
            Add
          </button>
        </div>
        <div className="tasks-header">
          <p className="tasks-header-text">Tasks</p>
          <button
            onClick={() => {
              setIsShowFilter((prev) => !prev);
            }}
          >
            <i className="fa-solid fa-filter"></i>{" "}
            {isShowFilter ? "Hide" : "Filters"}
          </button>
        </div>
        {isShowFilter && (
          <FilterSection
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        )}

        {error && <p className="error-text">{error}</p>}
        <div className="task-list">
          {filteredTaskList.length === 0 && (
            <div className="empty-state">
              <img
                className="empty-state-image"
                src={SearchDocumentIcon}
                alt="No Tasks Found"
              />
              <p> No Tasks found</p>
            </div>
          )}
          {filteredTaskList.length !== 0 &&
            filteredTaskList.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  toggleTaskStatus={toggleTaskStatus}
                  deleteTask={deleteTask}
                  saveEditTask={saveEditTask}
                  id={task.id}
                  task={task.task}
                  isDone={task.isDone}
                  isSubmitting={isSubmitting}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import TaskCard from "./components/TaskCard";
import SearchDocumentIcon from "./assets/search-document-icon.svg";
import TodoSkeleton from "./components/TodoSkeleton";
import FilterSection from "./components/FilterSection";
import type { FilterType } from "./types/Filter";
import useFilteredTasks from "./hooks/useFilteredTasks";
import { useTodo } from "./hooks/useTodo";

function App() {
  // local states for filtering & searching
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchKeyword, setSearchKeyword] = useState("");

  // global todo state/CRUD methods from context api
  const {
    taskList,
    newTask,
    loading,
    error,
    isSubmitting,
    setNewTask,
    addTask,
    toggleTaskStatus,
    updateTask,
    deleteTask,
  } = useTodo();

  const filteredTaskList = useFilteredTasks(
    taskList,
    searchKeyword,
    activeFilter,
  );

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

        {error && (
          <p className="error-text">
            {" "}
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </p>
        )}
        <div className="task-list">
          {!error && filteredTaskList.length === 0 && (
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
                  updateTask={updateTask}
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

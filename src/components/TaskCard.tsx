import { useState } from "react";
import "./TaskCard.css";
import type { ITask } from "../types/Task";

interface TaskCardProps extends ITask {
  toggleTaskStatus: (id: number, isDone: boolean) => void;
  deleteTask: (id: number) => void;
  saveEditTask: (id: number, task: string) => void;
  isSubmitting: boolean;
}

function TaskCard({
  id,
  task,
  isDone,
  toggleTaskStatus,
  deleteTask,
  saveEditTask,
  isSubmitting,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState("");

  const handleEdit = () => {
    setEditedTask(task);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (editedTask.trim() === "") return;

    saveEditTask(id, editedTask);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="task-card">
        <input
          className="checkbox"
          type="checkbox"
          name="task-checkbox"
          checked={isDone}
          onChange={(e) => {
            toggleTaskStatus(id, e.target.checked);
          }}
        />{" "}
        <span
          className="task-text"
          style={isDone ? { textDecoration: "line-through" } : {}}
        >
          {task}{" "}
        </span>
        <button
        disabled={isSubmitting}
          onClick={() => {
            handleEdit();
          }}
        >
          Edit
        </button>
        <button
        disabled={isSubmitting}
          onClick={() => {
            deleteTask(id);
          }}
        >
          X
        </button>
      </div>
    );
  } else {
    return (
      <div className="task-card">
        <input
          disabled
          className="checkbox"
          type="checkbox"
          name="task-checkbox"
          checked={isDone}
          onChange={(e) => {
            toggleTaskStatus(id, e.target.checked);
          }}
        />{" "}
        <input
          className="task-text-input"
          type="text"
          value={editedTask}
          onChange={(e) => {
            setEditedTask(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
        />{" "}
        <button
          disabled={editedTask.trim() === "" || isSubmitting}
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
        <button
        disabled={isSubmitting}
          onClick={() => {
            handleCancel();
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default TaskCard;

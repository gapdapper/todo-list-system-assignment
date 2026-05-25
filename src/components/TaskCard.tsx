import { useState } from "react";
import "./TaskCard.css";
import type { ITask } from "../types/Task";

interface TaskCardProps extends ITask {
  setDone: (id: number) => void;
  removeTask: (id: number) => void;
  saveEditTask: (id: number, task: string) => void;
}

function TaskCard({
  id,
  task,
  isDone,
  setDone,
  removeTask,
  saveEditTask,
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
          onChange={() => {
            setDone(id);
          }}
        />{" "}
        <span
          className="task-text"
          style={isDone ? { textDecoration: "line-through" } : {}}
        >
          {task}{" "}
        </span>
        <button
          onClick={() => {
            handleEdit();
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            removeTask(id);
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
          onChange={() => {
            setDone(id);
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
          disabled={editedTask.trim() === ""}
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
        <button
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

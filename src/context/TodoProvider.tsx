import { useEffect, useState, type ReactNode } from "react";
import { TodoContext } from "./TodoContext";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "../services/todoApi";
import type { ITask, ITaskResponse } from "../types/Task";

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");

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
        setLoadError("Failed to load todo list");
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!actionError) return;

    const timer = setTimeout(() => {
      setActionError("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [actionError]);

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
      setNewTask("")
    } catch {
      setActionError("Failed to add new todo");
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
    } catch {
      setActionError("Failed to set done todo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTask = async (id: number, updatedTask: string) => {
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
    } catch {
      setActionError("Failed to edit task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setIsSubmitting(true);
      await deleteTodo(id);

      setTaskList((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setActionError("Failed to delete task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        taskList,
        newTask,
        loading,
        loadError,
        actionError,
        isSubmitting,
        setNewTask,
        addTask,
        toggleTaskStatus,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

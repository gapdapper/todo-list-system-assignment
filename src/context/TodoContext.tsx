import { createContext, type Dispatch, type SetStateAction } from "react";
import type { ITask } from "../types/Task";

interface TodoContextType {
  taskList: ITask[];
  newTask: string;
  loading: boolean;
  error: string;
  isSubmitting: boolean;
  setNewTask: Dispatch<SetStateAction<string>>;
  addTask: () => Promise<void>;
  toggleTaskStatus: (id: number, isDone: boolean) => Promise<void>;
  updateTask: (id: number, updatedTask: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

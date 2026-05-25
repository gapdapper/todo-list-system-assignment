import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getTodos = async () => {
  const response = await api.get("/todos?_limit=5");
  return response.data;
};

export const createTodo = async (task: string) => {
  const response = await api.post("/todos", {
    title: task,
    completed: false,
  });

  return response.data;
};

export const updateTodo = async (id: number, updatedTask: string) => {
  const response = await api.patch(`/todos/${id}`, {
    title: updatedTask,
  });

  return response.data;
};

export const toggleTodo = async (id: number, isDone: boolean) => {
  const response = await api.patch(`/todos/${id}`, {
    completed: isDone,
  });

  return response.data;
};

export const deleteTodo = async (id: number) => {
  await api.delete(`/todos/${id}`);
};

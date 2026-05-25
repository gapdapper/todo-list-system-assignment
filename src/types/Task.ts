export interface ITask {
  id: number;
  task: string;
  isDone: boolean;
}

export interface ITaskResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
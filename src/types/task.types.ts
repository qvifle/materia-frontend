export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
  CANCELED = "CANCELED",
}

export interface ITask {
  id: string;
  createdAt: Date;
  title: string;
  description?: string | null;
  status: TaskStatus;
  orderId: number;
  deskId: string;
}

export interface ITaskFormFields extends Pick<ITask, "title" | "description"> {}

export interface ITaskStatusFormFields extends Pick<ITask, "status"> {}

export interface IOrderIdFormFields {
  overTaskId: string;
}
export interface IAddToDeskFields {
  overDeskId: string;
}

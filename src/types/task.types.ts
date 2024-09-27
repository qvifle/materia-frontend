export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
  CANCELED = "CANCELED",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface ITask {
  id: string
  createdAt: Date
  title: string
  description?: string | null
  status: TaskStatus
  priority: TaskPriority
  orderId: number
  deskId: string
}

export interface ITaskFormFields extends Pick<ITask, "title" | "description"> {}

export interface ITaskStatusFormFields extends Pick<ITask, "status"> {}
export interface ITaskPriorityFormFields extends Pick<ITask, "priority"> {}

export interface IOrderIdFormFields {
  overTaskId?: string
  overDeskId?: string
}
export interface IAddToDeskFields {
  overDeskId: string
}

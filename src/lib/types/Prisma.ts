export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  PAUSED = "PAUSED",
  CANCELED = "CANCELED",
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  iconUrl: string | null;
  createdAt: Date;
  userId: string;
  Desk?: Desk[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface Desk {
  id: string;
  title: string;
  color: string | null;
  projectId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  deskId: string;
}

import { ITask } from "./task.types";

export interface IDesk {
  id: string;
  title: string;
  color: string | null;
  projectId: string;
  tasks: ITask[];
}

export interface IDeskFormFields
  extends Omit<IDesk, "id" | "projectId" | "tasks"> {}

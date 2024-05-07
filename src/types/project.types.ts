import { IDesk } from "./desk.types";

export interface IProject {
  id: string;
  title: string;
  description?: string | null;
  iconUrl: string | null;
  createdAt: Date;
  userId: string;
  Desk?: IDesk[];
}

export interface IProjectFormFields
  extends Pick<IProject, "title" | "description" | "iconUrl"> {}

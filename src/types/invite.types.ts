import { IProject } from "./project.types";

export interface IInvite {
  id: string;
  senderId: string;
  recipientId: string;
  projectId: string;
  project: IProject;
}

export interface IMyInvite extends IInvite {
  sender: {
    email: string;
  };
}
export interface IProjectInvite extends IInvite {
  recipient: {
    email: string;
    name: string;
  };
}

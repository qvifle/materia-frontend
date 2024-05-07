export interface IDesk {
  id: string;
  title: string;
  color: string | null;
  projectId: string;
}


export interface IDeskFormFields extends Omit<IDesk, "id" | "projectId"> {}

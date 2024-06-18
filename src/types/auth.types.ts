export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  projectId?: string | null;
}

export interface ISignInFormFields extends Pick<IUser, "email" | "password"> {}
export interface ISignUpFormFields
  extends Pick<IUser, "name" | "email" | "password"> {}

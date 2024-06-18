export interface IMember {
  id: string;
  name: string;
  email: string;
}

export interface IMemberDataResponse {
  members: IMember[];
  creatorId: string;
}


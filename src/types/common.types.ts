export interface Report {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
}
export type RootStackParamList = {
  Home: undefined;
  Workspace: undefined;
};
export type FolderType = {
  _id: string
  userId: string
  name: string
  desc: string
  createdAt: string
  updatedAt: string
  __v: number
};

export type userDataType = {
  email: string
  id: string
  message: string
  name: string
  role: string
  token: string
}
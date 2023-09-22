export interface UserForm {
  username: string;
  email: string;
  password: string;
}

export interface User {
  userId: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  summary: string;
  education: string;
  work: string;
  github: string;
  website: string;
  createdAt: string;
  updatedAt: string;
}
export interface QuestionObject {
  id: number;
  title: string;
  categories: string[];
  complexity: string;
  link: string;
  description: string;
}

export interface UserForm {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserProfileForm {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  summary: string;
  education: string;
  work: string;
  github: string;
  website: string;
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

export interface History {
  questionId: number;
  attempt: string;
}
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

export interface LoginForm {
  username: string;
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

export interface Attempt {
  id: number;
  questionId: number;
  title: string;
  categories: string[];
  complexity: string;
  link: string;
  description: string;
  attempt: string;
  language: string;
  date: string;
}

export interface AttemptForm {
  questionId: number;
  attempt: string;
  language: string;
}

// extensible if we want to add criteria
export interface MatchCriteria {
  difficulty: string;
}

export interface MatchResult {
  username: string;
  user_id: number;
}

interface CodeSubmissionStatus {
  id: number;
  description: string;
}
export interface CodeResult {
  stdout: string,
  time: string,
  memory: number,
  stderr: string,
  token: string,
  compile_output: string,
  message: string,
  status: CodeSubmissionStatus
}

const QUESTIONS_URI =
  process.env.QUESTION_SERVICE_URI ||
  process.env.NEXT_PUBLIC_QUESTION_SERVICE_URI ||
  "http://localhost:3001";
const USERS_URI =
  process.env.NEXT_PUBLIC_USER_SERVICE_URI || "http://localhost:8000";
export const MATCHING_URI =
  process.env.NEXT_PUBLIC_MATCHING_SERVICE_URI || "ws://localhost:3002/";

export const QUESTIONS_API = `${QUESTIONS_URI}/questions`;

export const USERS_API = `${USERS_URI}/users`;

export const CREATE_USER_API = `${USERS_API}/register`;

export const HISTORY_API = `${USERS_URI}/history`;

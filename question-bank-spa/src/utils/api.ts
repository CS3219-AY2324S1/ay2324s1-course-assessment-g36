import { UserForm, User } from "@/interfaces";

const CREATE_USER_API = 'http://localhost:3001/users/register'
const GET_ALL_USERS_API = 'http://localhost:3001/users'

export async function createUser(userForm: UserForm): Promise<void> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm)
  };
  await fetch(CREATE_USER_API, requestOptions)
}

export async function fetchAllUsers(): Promise<User[]> {
  const response = await fetch(GET_ALL_USERS_API);
  const data = await response.json();
  return data;
}
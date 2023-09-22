import { UserForm, User } from "@/interfaces";

const CREATE_USER_API = 'http://localhost:3001/users/register'
const USERS_API = 'http://localhost:3001/users'

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
  const response = await fetch(USERS_API);
  const data = await response.json();
  return data;
}

export async function fetchUser(id: string): Promise<User> {
  const fetchSingleUserApi = `${USERS_API}/${id}`
  const response = await fetch(fetchSingleUserApi);
  const data = await response.json();
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const deleteUserApi = `${USERS_API}/${id}`
  const requestOptions = {
    method: "DELETE"
  };
  await fetch(deleteUserApi, requestOptions)
}
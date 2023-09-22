import { UserForm, UpdateUserProfileForm, User } from "@/interfaces";

const CREATE_USER_API = 'http://localhost:3001/users/register'
const USERS_API = 'http://localhost:3001/users'

export async function createUser(userForm: UserForm): Promise<User> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm)
  };
  const response = await fetch(CREATE_USER_API, requestOptions)
  const user = await response.json()
  return user
}

export async function updateUser(id: string, updateUserForm: UpdateUserProfileForm): Promise<void> {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUserForm)
  };
  const updateUserApi = `${USERS_API}/${id}`
  await fetch(updateUserApi, requestOptions)
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

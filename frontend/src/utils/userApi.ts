import { UserForm, UpdateUserProfileForm, User } from "@/interfaces";

const CREATE_USER_API = 'http://localhost:8000/users/register'
const USERS_API = 'http://localhost:8000/users'

export async function createUser(userForm: UserForm): Promise<User | string> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm)
  };

  try {
    const response = await fetch(CREATE_USER_API, requestOptions)
    const user = await response.json()
    if (!response.ok) throw new Error(user.error)
    return user.res
  } catch (error: any) {
    return error.message;
  }

}

export async function updateUser(id: string, updateUserForm: UpdateUserProfileForm): Promise<User | string> {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUserForm)
  };

  const updateUserApi = `${USERS_API}/${id}`

  try {
    const response = await fetch(updateUserApi, requestOptions)
    const data = await response.json();
    if (!response.ok) throw new Error(data.error)
    return data.res
  } catch (error: any) {
    return error.message
  }
}

export async function fetchAllUsers(): Promise<User[] | string> {
  try {
    const response = await fetch(USERS_API)
    const data = await response.json();
    if (!response.ok) throw new Error(data.error)
    return data.res
  } catch (error: any) {
    return error.message
  }
}

export async function fetchUser(id: string): Promise<User | string> {
  const api = `${USERS_API}/${id}`
  try {
    const response = await fetch(api)
    const data = await response.json();
    if (!response.ok) throw new Error(data.error)
    return data.res
  } catch (error: any) {
    return error.message
  }
}

export async function deleteUser(id: string): Promise<void | string> {
  const deleteUserApi = `${USERS_API}/${id}`
  const requestOptions = {
    method: "DELETE"
  };

  try {
    const response = await fetch(deleteUserApi, requestOptions)
    const data = await response.json();
    if (!response.ok) throw new Error(data.error)
  } catch (error: any) {
    return error.message
  }

}

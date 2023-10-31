import { UserForm, UpdateUserProfileForm, User } from "@/interfaces";
import { USERS_API, CREATE_USER_API } from "./api";
import { fetchDataOrThrowError } from "./utils";

export async function createUser(userForm: UserForm): Promise<User> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm)
  };
  return fetchDataOrThrowError(CREATE_USER_API, requestOptions)
}

export async function updateUser(
  id: string,
  updateUserForm: UpdateUserProfileForm,
  token: string
): Promise<User> {
  const updateUserApi = `${USERS_API}/${id}`
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateUserForm)
  };
  return fetchDataOrThrowError(updateUserApi, requestOptions)
}

export async function fetchAllUsers(token: string): Promise<User[]> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return fetchDataOrThrowError(USERS_API, requestOptions)
}

export async function fetchUser(id: string, token: string): Promise<User> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const fetchUserApi = `${USERS_API}/${id}`
  return fetchDataOrThrowError(fetchUserApi, requestOptions)
}

export async function deleteUser(id: string, token: string): Promise<void> {
  const deleteUserApi = `${USERS_API}/${id}`
  const requestOptions = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  };
  fetchDataOrThrowError(deleteUserApi, requestOptions)
}

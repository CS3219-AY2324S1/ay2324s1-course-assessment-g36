import { LoginForm, UpdateUserProfileForm, User, UserForm } from "@/interfaces";

const CREATE_USER_API = "http://localhost:8000/users/register";

const USERS_API = "http://localhost:8000/users";

async function fetchDataOrThrowError(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions);
  const results = await response.json();
  if (!response.ok) throw new Error(results.error);
  return results.res;
}

export async function createUser(userForm: UserForm): Promise<User> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userForm),
  };
  return fetchDataOrThrowError(CREATE_USER_API, requestOptions);
}

export async function updateUser(id: string, updateUserForm: UpdateUserProfileForm): Promise<User> {
  const updateUserApi = `${USERS_API}/${id}`;
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateUserForm),
  };
  return fetchDataOrThrowError(updateUserApi, requestOptions);
}

export async function fetchAllUsers(): Promise<User[]> {
  return fetchDataOrThrowError(USERS_API);
}

export async function fetchUser(id: string): Promise<User> {
  const fetchUserApi = `${USERS_API}/${id}`;
  return fetchDataOrThrowError(fetchUserApi);
}

export async function deleteUser(id: string): Promise<void> {
  const deleteUserApi = `${USERS_API}/${id}`;
  const requestOptions = {
    method: "DELETE",
  };
  const response = await fetch(deleteUserApi, requestOptions);
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
}

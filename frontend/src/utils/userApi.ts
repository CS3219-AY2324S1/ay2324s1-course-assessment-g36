import { UpdateUserProfileForm, User, UserForm } from "@/interfaces"

const CREATE_USER_API = "http://localhost:8000/users/register"
const USERS_API = "http://localhost:8000/users"

async function fetchDataOrThrowError(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions).then((response) => {
    if (response.status === 401) {
      throw new Error("unauthorized")
    }
    return response
  })
  const results = await response.json()
  if (!response.ok) throw new Error(results.error)
  return results.res
}

export async function createUser(userForm: UserForm): Promise<User> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userForm),
  }
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
    body: JSON.stringify(updateUserForm),
  }
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
  }
  fetchDataOrThrowError(deleteUserApi, requestOptions)
}

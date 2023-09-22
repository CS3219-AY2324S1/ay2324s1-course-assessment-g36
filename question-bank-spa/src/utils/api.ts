import { UserForm } from "@/interfaces";

const CREATE_USER_API = 'http://localhost:3001/users/register'

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
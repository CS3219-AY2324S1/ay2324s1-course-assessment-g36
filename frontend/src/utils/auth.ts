import { LoginForm } from '@/interfaces'

const LOGIN_USER_API = 'http://localhost:8000/users/login'

async function fetchDataOrThrowError(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions)
  const results = await response.json()
  if (!response.ok) throw new Error(results.error)
  return results.res
}

export async function loginUser(loginForm: LoginForm): Promise<string> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginForm),
  }
  return fetchDataOrThrowError(LOGIN_USER_API, requestOptions)
}

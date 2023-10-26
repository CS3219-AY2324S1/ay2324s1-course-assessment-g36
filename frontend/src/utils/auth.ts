import { LoginForm } from '@/interfaces'

const LOGIN_USER_API = 'http://localhost:8000/users/login'

export async function loginUser(loginForm: LoginForm): Promise<string> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginForm),
  }
  const response = await fetch(LOGIN_USER_API, requestOptions)
  const results = await response.json()
  if (!response.ok) throw new Error(results.error)
  // returns JWT
  return results.res
}

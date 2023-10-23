import { History } from "@/interfaces";

const HISTORY_API = 'http://localhost:8000/history'

async function fetchDataOrThrowError(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions)
  const results = await response.json()
  if (!response.ok) throw new Error(results.error)
  return results.res
}

export async function createHistory(attempt: History): Promise<History> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attempt)
  };
  return fetchDataOrThrowError(HISTORY_API, requestOptions)
}

export async function fetchAllHistoryByUser(userId: string): Promise<History[]> {
  const userHistoryApi = `${HISTORY_API}/${userId}`
  return fetchDataOrThrowError(userHistoryApi)
}

export async function fetchHistoryByQuestion(userId: string, questionId: string): Promise<History> {
    const userQuestionHistoryApi = `${HISTORY_API}/${userId}/${questionId}`
    return fetchDataOrThrowError(userQuestionHistoryApi)
}
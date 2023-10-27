import { QuestionObject } from "@/interfaces"
const QUESTIONS_API = 'http://localhost:3001/questions'

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

export async function addQuestion(
  newQuestion: QuestionObject,
  token: string
): Promise<QuestionObject> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newQuestion),
  }
  return fetchDataOrThrowError(QUESTIONS_API, requestOptions)
}


export async function fetchAllQuestions(token: string): Promise<QuestionObject[]> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return fetchDataOrThrowError(QUESTIONS_API, requestOptions)
}

export async function fetchQuestion(id: String, token: string): Promise<QuestionObject> {
  const fetchSingleQuestionApi = `${QUESTIONS_API}/${id}`
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return fetchDataOrThrowError(fetchSingleQuestionApi, requestOptions)
}

export async function deleteQuestion(title: string, token: string): Promise<void> {
  const deleteQuestionApi = `${QUESTIONS_API}/${title}`
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return fetchDataOrThrowError(deleteQuestionApi, requestOptions)
}

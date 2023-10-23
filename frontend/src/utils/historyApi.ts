import { Attempt } from "@/interfaces";
import { fetchQuestion } from "./questionApi";

const HISTORY_API = 'http://localhost:8000/history'

async function fetchDataOrThrowError(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions)
  const results = await response.json()
  if (!response.ok) throw new Error(results.error)
  return results.res
}

export async function createHistory(userId: number, attempt: Attempt): Promise<Attempt> {
  const userHistoryApi = `${HISTORY_API}/${userId}`
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attempt)
  };
  return fetchDataOrThrowError(userHistoryApi, requestOptions)
}

export async function fetchAllHistoryByUser(userId: string): Promise<Attempt[]> {
  const userHistoryApi = `${HISTORY_API}/${userId}`
  console.log(userHistoryApi);
  const data = await fetchDataOrThrowError(userHistoryApi)

  const attemptListPromises = data.map(async (item: any) => {
    const question = await fetchQuestion(item.questionId);

    return {
      id: item.attemptId,
      questionId: item.questionId,
      title: question.title,
      categories: question.categories,
      complexity: question.complexity,
      link: question.link,
      description: question.description,
      attempt: item.attempt,
      date: item.updatedAt
    };
  });

  const attemptList = await Promise.all(attemptListPromises);

  return attemptList;
}

export async function fetchHistoryByQuestion(userId: string, questionId: string): Promise<Attempt> {
    const userQuestionHistoryApi = `${HISTORY_API}/${userId}/${questionId}`
    const data = await fetchDataOrThrowError(userQuestionHistoryApi);
    const question = await fetchQuestion(questionId);

    const attempt: Attempt = {
      id: data.attemptId,
      questionId: data.questionId,
      title: question.title,
      categories: question.categories,
      complexity: question.complexity,
      link: question.link,
      description: question.description,
      attempt: data.attempt,
      date: data.updatedAt
    }
    return attempt;
}
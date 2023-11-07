import { Attempt, AttemptForm } from "@/interfaces";
import { fetchQuestion } from "./questions";
import { HISTORY_API } from "./api";
import { fetchDataOrThrowError } from "./utils";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export async function createHistory(attempt: AttemptForm, token: string): Promise<Attempt> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(attempt)
  };
  return fetchDataOrThrowError(HISTORY_API, requestOptions)
}

export async function updateHistory(attempt: Attempt, token: string): Promise<Attempt> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(attempt)
  };
  return fetchDataOrThrowError(HISTORY_API, requestOptions)
}

export async function fetchAllHistoryByUser(token: string): Promise<Attempt[]> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetchDataOrThrowError(HISTORY_API, requestOptions)

  const attemptListPromises = data.map(async (item: any) => {
    try {
      const question = await fetchQuestion(item.questionId);

      return {
        id: item.attemptId,
        userId: item.userId,
        questionId: item.questionId,
        title: question.title,
        categories: question.categories,
        complexity: question.complexity,
        link: question.link,
        description: question.description,
        attempt: item.attempt,
        language: item.language,
        date: formatDate(item.updatedAt)
      };
    } catch (err) {
      return null;
    }
  })

  const attemptList = await Promise.all(attemptListPromises);

  return attemptList.filter((item: any) => item !== null);
}

export async function deleteHistory(attemptId: number, token: string): Promise<void> {
  const deleteHistoryApi = `${HISTORY_API}/${attemptId}`
  const requestOptions = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(deleteHistoryApi, requestOptions)
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error)
  }
}
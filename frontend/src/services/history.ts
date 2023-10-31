import { Attempt } from "@/interfaces";
import { fetchQuestion } from "./questions";
import { HISTORY_API } from "./api";
import { fetchDataOrThrowError } from "./apiUtils";

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

export async function createHistory(attempt: Attempt, token: string): Promise<Attempt> {
  const userId = attempt.userId;
  const userHistoryApi = `${HISTORY_API}/${userId}`
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(attempt)
  };
  return fetchDataOrThrowError(userHistoryApi, requestOptions)
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
      const question = await fetchQuestion(item.questionId, token);

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

// export async function fetchHistoryByQuestion(userId: string, questionId: number, token: string): Promise<Attempt> {
//     const userQuestionHistoryApi = `${HISTORY_API}/${userId}/${questionId}`
//     const data = await fetchDataOrThrowError(userQuestionHistoryApi);
//     const question = await fetchQuestion(questionId, token);

//     const attempt: Attempt = {
//       id: data.attemptId,
//       userId: data.userId,
//       questionId: data.questionId,
//       title: question.title,
//       categories: question.categories,
//       complexity: question.complexity,
//       link: question.link,
//       description: question.description,
//       attempt: data.attempt,
//       language: data.language,
//       date: formatDate(data.updatedAt)
//     }
//     return attempt;
// }

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
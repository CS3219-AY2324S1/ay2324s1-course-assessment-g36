import { QuestionObject } from "@/interfaces";
import { QUESTIONS_API, HISTORY_API, PRIVATE_QUESTIONS_API } from "./api";
import { fetchDataOrThrowError } from "./utils";

export async function addQuestion(
  newQuestion: QuestionObject,
  token: string,
): Promise<QuestionObject> {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newQuestion),
  };
  return fetchDataOrThrowError(QUESTIONS_API, requestOptions);
}

export async function fetchAllQuestions(): Promise<QuestionObject[]> {
  return fetchDataOrThrowError(QUESTIONS_API);
}

export async function fetchQuestion(id: number): Promise<QuestionObject> {
  const fetchSingleQuestionApi = `${QUESTIONS_API}/id/${id}`;
  return fetchDataOrThrowError(fetchSingleQuestionApi);
}

export async function serverSideFetchQuestion(
  id: number,
): Promise<QuestionObject> {
  const fetchSingleQuestionApi = `${PRIVATE_QUESTIONS_API}/id/${id}`;
  return fetchDataOrThrowError(fetchSingleQuestionApi);
}

export async function deleteQuestion(id: number, token: string): Promise<void> {
  const deleteQuestionApi = `${QUESTIONS_API}/${id}`;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteHistoryApi = `${HISTORY_API}/question/${id}`;
  await fetch(deleteHistoryApi, requestOptions);

  await fetch(deleteQuestionApi, requestOptions).then((response) => {
    if (response.status === 401) {
      throw new Error("unauthorized");
    }

    return response;
  });
}

import { QuestionObject } from "@/interfaces"
import { QUESTIONS_API, HISTORY_API } from "./api";

export async function addQuestion(newQuestion: QuestionObject): Promise<QuestionObject> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion)
    };
    const response = await fetch(QUESTIONS_API, requestOptions)
    const question = await response.json()
    return question.res
  }


export async function fetchAllQuestions(): Promise<QuestionObject[]> {
    const response = await fetch(QUESTIONS_API);
    const data = await response.json();
    return data.res;
}

export async function fetchQuestion(id: string): Promise<QuestionObject> {
    const fetchSingleQuestionApi = `${QUESTIONS_API}/${id}`
    const response = await fetch(fetchSingleQuestionApi);
    const data = await response.json();
    return data.res;
  }

// returns questions that matches complexity
export async function fetchQuestionsByComplexity(complexity: string): Promise<QuestionObject> {
  const fetchQuestionsApi = `${QUESTIONS_API}/complexity/${complexity}`
  const response = await fetch(fetchQuestionsApi);
  const data = await response.json();
  console.log(data);
  return data.res;
}

// returns questions that matches complexity and at least one category
// if no matching questions found, return questions with matching complexity
export async function fetchQuestionsByCategory(complexity: string, categories: string[]): Promise<QuestionObject> {
  const queryParams = categories.map(value => `category=${encodeURIComponent(value)}`).join('&');
  const fetchQuestionsApi = `${QUESTIONS_API}/${complexity}/categories?${queryParams}`
  console.log(fetchQuestionsApi);

  const response = await fetch(fetchQuestionsApi);
  const data = await response.json();
  return data.res;
}

export async function deleteQuestion(id: number): Promise<void> {
    const requestOptions = {
      method: "DELETE"
    };
    const deleteQuestionApi = `${QUESTIONS_API}/${id}`
    await fetch(deleteQuestionApi, requestOptions)

    // delete all attempts for this question if any
    const deleteHistoryApi = `${HISTORY_API}/question/${id}`
    await fetch(deleteHistoryApi, requestOptions)
}
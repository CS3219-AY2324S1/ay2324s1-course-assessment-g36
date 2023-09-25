import { QuestionObject } from "@/data/interface"
const QUESTIONS_API = 'http://localhost:3001/questions'

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
    return question
  }


export async function fetchAllQuestions(): Promise<QuestionObject[]> {
    const response = await fetch(QUESTIONS_API);
    const data = await response.json();
    return data;
}

export async function fetchQuestion(id: String): Promise<QuestionObject> {
    const fetchSingleQuestionApi = `${QUESTIONS_API}/${id}`
    const response = await fetch(fetchSingleQuestionApi);
    const data = await response.json();
    return data;
  }

export async function deleteQuestion(title: string): Promise<void> {
    const deleteQuestionApi = `${QUESTIONS_API}/${title}`
    const requestOptions = {
        method: "DELETE"
    };
    await fetch(deleteQuestionApi, requestOptions)
}
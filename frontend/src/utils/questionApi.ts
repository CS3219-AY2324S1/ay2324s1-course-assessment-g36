import { QuestionObject } from "@/interfaces"
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
    return question.res
  }


export async function fetchAllQuestions(): Promise<QuestionObject[]> {
    const response = await fetch(QUESTIONS_API);
    const data = await response.json();
    return data.res;
}

export async function fetchQuestion(id: string): Promise<QuestionObject> {
    const fetchSingleQuestionApi = `${QUESTIONS_API}/id/${id}`
    const response = await fetch(fetchSingleQuestionApi);
    const data = await response.json();
    return data.res;
  }

// returns random that matches complexity
export async function fetchQuestionByComplexity(complexity: string): Promise<QuestionObject> {
  const fetchQuestionsApi = `${QUESTIONS_API}/complexity/${complexity}`
  const response = await fetch(fetchQuestionsApi);
  const data = await response.json();
  console.log(data)
  return data.res;
}

// returns random question that matches complexity and at least one category
// if no match found, return any question with matching complexity
export async function fetchQuestionByCategory(complexity: string, categories: string[]): Promise<QuestionObject> {
  const queryParams = categories.map(value => `category=${encodeURIComponent(value)}`).join('&');
  const fetchQuestionsApi = `${QUESTIONS_API}/${complexity}/categories?${queryParams}`

  const response = await fetch(fetchQuestionsApi);
  const data = await response.json();
  return data.res;
}

export async function deleteQuestion(title: string): Promise<void> {
    const deleteQuestionApi = `${QUESTIONS_API}/${title}`
    const requestOptions = {
        method: "DELETE"
    };
    await fetch(deleteQuestionApi, requestOptions)
}
import data from "../data/questions.json"
import { QuestionObject } from "@/data/interface"

export function populateToLocalStorage(): void {

  const questionsArray = data as QuestionObject[]

  if (typeof Storage !== "undefined") {
    questionsArray.forEach((question: QuestionObject) => {
      
      const existingQuestion = localStorage.getItem(`question_${question.id}`);      
      if (!existingQuestion) {
        localStorage.setItem(`question_${question.id}`, JSON.stringify(question));
        console.log(`Question with ID ${question.id} added to local storage.`);
      } else {
        console.log(`Question with ID ${question.id} already exists in local storage.`);
      }
    })
  } else {
    console.log("Local storage is not supported by this browser.");
  }

}

export function fetchQuestionsFromLocalStorage(): QuestionObject[] {

  const questions: QuestionObject[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    // Check if the key corresponds to a question
    if (key && key.startsWith("question_")) {
      const jsonString = localStorage.getItem(key);

      if (jsonString) {
        const question: QuestionObject = JSON.parse(jsonString);
        questions.push(question);
      }
    }
  }

  questions.sort((a, b) => a.id - b.id);

  return questions;
}
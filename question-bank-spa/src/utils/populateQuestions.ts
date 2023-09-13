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

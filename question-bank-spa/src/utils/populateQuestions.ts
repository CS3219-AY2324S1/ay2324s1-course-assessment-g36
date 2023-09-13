import data from "../data/questions.json"
import { QuestionObject } from "@/data/interface"

export function populateInitialQuestionsToLocalStorage(): void {

  const questionsArray = data as QuestionObject[]

  if (typeof Storage !== "undefined") {

    const areQuestionsPopulated = localStorage.getItem("questions_populated");     
    if (areQuestionsPopulated) {
      return
    } 

    questionsArray.forEach((question: QuestionObject) => {
      const existingQuestion = localStorage.getItem(`question_${question.title}`);      
      if (!existingQuestion) {
        localStorage.setItem(`question_${question.title}`, JSON.stringify(question));
      } 
    })
    
    localStorage.setItem(`questions_populated`, JSON.stringify("true"));
  } else {
    console.log("Local storage is not supported by this browser.");
  }

}

export function fetchQuestionsFromLocalStorage(): QuestionObject[] {

  const questions: QuestionObject[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

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
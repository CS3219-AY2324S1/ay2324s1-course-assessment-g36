import { QuestionObject } from "@/data/interface";
import { fetchQuestionsFromLocalStorage } from "./populateQuestions";

export function validateForm(form: QuestionObject) {
  return validateFormTitleField(form.title) 
    && validateFormLinkField(form.link)
}

function validateFormTitleField(formTitle: string): boolean {
  // Checks form title is not a duplicate
  const formTitleLowercase = formTitle.toLowerCase();
  const questionsInLocalStorage: QuestionObject[] = fetchQuestionsFromLocalStorage()
  const duplicateQn = questionsInLocalStorage.filter(question => question.title.toLowerCase() === formTitleLowercase)
  return duplicateQn.length === 0
}

function validateFormLinkField(formLink: string): boolean {
  try {
    new URL(formLink);
    return true;
  } catch (error) {
    return false;
  }
}

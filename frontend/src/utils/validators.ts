import { QuestionObject } from "@/interfaces";
import { fetchAllQuestions } from "../services/questions";

export async function validateForm(form: QuestionObject) {
  return await validateFormTitleField(form.title) 
    && validateFormLinkField(form.link)
}

async function validateFormTitleField(formTitle: string): Promise<boolean> {
  // Checks form title is not a duplicate
  const token = localStorage.getItem("token") ?? ""
  const formTitleLowercase = formTitle.toLowerCase()
  const questionsInDatabase: QuestionObject[] = await fetchAllQuestions(token)
  const duplicateQn = questionsInDatabase.filter(
    (question) => question.title.toLowerCase() === formTitleLowercase
  )
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

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

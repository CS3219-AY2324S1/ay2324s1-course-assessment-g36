import { QuestionObject } from "@/data/interface";
import { fetchAllQuestions } from "./questionApi";

export async function validateForm(form: QuestionObject) {
  return await validateFormTitleField(form.title) 
    && validateFormLinkField(form.link)
}

async function validateFormTitleField(formTitle: string): Promise<boolean> {
  // Checks form title is not a duplicate
  const formTitleLowercase = formTitle.toLowerCase();
  const questionsInDatabase: QuestionObject[] = await fetchAllQuestions()
  const duplicateQn = questionsInDatabase.filter(question => question.title.toLowerCase() === formTitleLowercase)
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

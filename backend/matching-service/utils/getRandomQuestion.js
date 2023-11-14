import env from "../env.js";

const QUESTION_API = env.QUESTION_SERVICE_URI || "http://localhost:3001";

export async function getRandomQuestionId(complexity) {
  const fetchQuestionsApi =
    QUESTION_API + "/questions/complexity/" + complexity;
  const response = await fetch(fetchQuestionsApi);
  const data = await response.json();
  return data.res.id;
}

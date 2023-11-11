const question_api = process.env.QUESTION_SERVICE_URI || "http://localhost:3001"

export async function getRandomQuestionId(complexity) {
  const fetchQuestionsApi =
    question_api + "/questions/complexity/" + complexity;
  const response = await fetch(fetchQuestionsApi);
  const data = await response.json();
  return data.res.id;
}

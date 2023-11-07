export async function getRandomQuestionId(complexity) {
  const fetchQuestionsApi =
    "http://localhost:3001/questions/complexity/" + complexity;
  const response = await fetch(fetchQuestionsApi);
  const data = await response.json();
  return data.res.id;
}

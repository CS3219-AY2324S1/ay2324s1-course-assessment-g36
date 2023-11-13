import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCodeExplanation(code, language) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You will be provided with a piece of code written in ${language}, and your task is to explain it in a concise way.`,
      },
      {
        role: "user",
        content: code,
      },
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // console.log(JSON.stringify(response));

  const message = response.choices[0].message.content;
  if (!message) {
    throw new Error("Could not explain code");
  }

  return message;
}

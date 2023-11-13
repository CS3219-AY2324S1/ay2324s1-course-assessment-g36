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

export async function getCodeGeneration(language, description) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You will be provided with a description. Your task is to generate code based on the description in the ${language} language. Output only the code in a text format without any description. Do not output code in Markdown code blocks.`,
      },
      {
        role: "user",
        content: description,
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
    throw new Error("Could not generate code");
  }

  // Remove Markdown code blocks if any.
  const markdown = /^```(?:\w*)\n([\s\S]*?)\n```$/g.exec(message);
  if (markdown) {
    return markdown[1];
  }

  return message;
}

import { CodeExplanationResult } from "@/interfaces";
import { COLLABORATION_API } from "./api";

export async function explainCode(
  language: string,
  srcCode: string,
  token: string,
  onContent: (result: CodeExplanationResult) => void,
  onFinished: (result: CodeExplanationResult) => void,
): Promise<void> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      language: language,
      code: srcCode,
    }),
  };
  try {
    const response = await fetch(`${COLLABORATION_API}/explain`, options);
    if (!response.body) {
      throw new Error("Response has no body");
    }

    const decoder = new TextDecoder();
    let result = "";
    for await (const chunk of response.body as any) {
      result += decoder.decode(chunk);
      onContent({ response: result });
    }
    onFinished({ response: result });
  } catch (error) {
    console.error(error);
    onFinished({ error: String(error) });
  }
}

export async function generateCode(
  language: string,
  description: string,
  token: string,
  onContent: (result: CodeExplanationResult) => void,
  onFinished: (result: CodeExplanationResult) => void,
): Promise<void> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      language,
      description,
    }),
  };
  try {
    const response = await fetch(`${COLLABORATION_API}/generate`, options);
    if (!response.body) {
      throw new Error("Response has no body");
    }

    let result = "";
    const decoder = new TextDecoder();
    for await (const chunk of response.body as any) {
      result += decoder.decode(chunk);
      onContent({ response: result });
    }
    onFinished({ response: result });
  } catch (error) {
    console.error(error);
    onFinished({ error: String(error) });
  }
}

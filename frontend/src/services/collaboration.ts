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
    for await (const chunk of streamAsyncIterator(response.body)) {
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
    for await (const chunk of streamAsyncIterator(response.body) ) {
      result += decoder.decode(chunk);
      onContent({ response: result });
    }
    onFinished({ response: result });
  } catch (error) {
    console.error(error);
    onFinished({ error: String(error) });
  }
}

// See https://jakearchibald.com/2017/async-iterators-and-generators/#making-streams-iterate.
async function* streamAsyncIterator(stream: ReadableStream) {
  // Get a lock on the stream
  const reader = stream.getReader();

  try {
    while (true) {
      // Read from the stream
      const {done, value} = await reader.read();
      // Exit if we're done
      if (done) return;
      // Else yield the chunk
      yield value;
    }
  }
  finally {
    reader.releaseLock();
  }
}

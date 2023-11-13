import { CodeExplanationResult } from "@/interfaces";

export async function explainCode(
  language: string,
  srcCode: string,
  token: string,
): Promise<CodeExplanationResult> {
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
    const response = await fetch("http://localhost:5173/api/explain", options);
    const json = await response.json();
    return json as CodeExplanationResult;
  } catch (error) {
    console.error(error);
    return { error: String(error) };
  }
}
  }
}

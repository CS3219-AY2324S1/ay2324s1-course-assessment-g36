import { CodeResult } from "@/interfaces";

// language IDs are determined by Judge0 getLanguages API
// I handpicked some for our use case
const languageToIdMap: { [key: string]: number } = {
  "c": 75,
  "c++": 76,
  "c#": 51,
  "python": 71,
  "javascript": 63,
  "typescript": 74,
  "ruby": 72,
  "java": 62,
  "objective-c": 79,
  "php": 68
}

function getLanguageId(language: string): number {
  const DEFAULT_ID = 71 // Python
  return languageToIdMap[language] || DEFAULT_ID
}

export async function executeCode(language: string, srcCode: string): Promise<any> {
  const url = process.env.NEXT_PUBLIC_CODE_EXECUTION_API_URL || '';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_CODE_EXECUTION_API_KEY || '',
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_CODE_EXECUTION_HOST || ''
    },
    body: JSON.stringify({
      language_id: getLanguageId(language),
      source_code: srcCode
    })
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    const json = JSON.parse(result) as CodeResult
    return json
  } catch (error) {
    console.error(error);
  }
}
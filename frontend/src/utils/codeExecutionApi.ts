function getLanguageId(language: string): number {
  // language IDs are determined by Judge0 getLanguages API
  // I handpicked some for our use case
  const DEFAULT_ID = 71 // Python
  const languageToIdMap: { [key: string]: number } = {
    "C": 75,
    "C++": 76,
    "C#": 51,
    "Python": 71,
    "JavaScript": 63,
    "TypeScript": 74,
    "Ruby": 72,
    "Java": 62,
    "Objective-C": 79,
    "PHP": 68
  }
  return languageToIdMap[language] || DEFAULT_ID
}

export async function executeCode(language: string, srcCode: string): Promise<any> {
  return new Promise(resolve => setTimeout(() => resolve("successfully executed code"), 3000))

}
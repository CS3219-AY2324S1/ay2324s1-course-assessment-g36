import { CodeExplanationResult } from "@/interfaces";
import { Stack, Heading, Text } from "@chakra-ui/react";

interface IOwnProps {
  result: CodeExplanationResult;
}

export default function CodeExplanationOutput({
  result,
}: IOwnProps): JSX.Element {
  if ("error" in result) {
    return (
      <Text color="#ef4743">
        Server error: {result.error}. Please try again later.
      </Text>
    );
  }

  return (
    <Stack>
      <Heading size="sm">Explanation</Heading>
      <Text>{result.response}</Text>
    </Stack>
  );
}

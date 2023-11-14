import { CodeExplanationResult } from "@/interfaces";
import { Button, Stack, Heading, Text, useToast } from "@chakra-ui/react";
import styles from "./CodeGenerationOutput.module.css";

interface IOwnProps {
  result: CodeExplanationResult;
}

export default function CodeGenerationOutput({
  result,
}: IOwnProps): JSX.Element {
  const toast = useToast();

  if ("error" in result) {
    return (
      <Text color="#ef4743">
        Server error: {result.error}. Please try again later.
      </Text>
    );
  }

  return (
    <Stack>
      <Heading size="sm">Generated Code</Heading>
      <div>
        <Button
          colorScheme="whiteAlpha"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(result.response);
            toast({
              title: "Copied to clipbaord!",
              status: "success",
              duration: 3000,
              position: "top",
              isClosable: true,
            });
          }}
        >
          Copy to clipboard
        </Button>
      </div>
      <pre className={styles.codeblock}>
        <code>{result.response}</code>
      </pre>
    </Stack>
  );
}

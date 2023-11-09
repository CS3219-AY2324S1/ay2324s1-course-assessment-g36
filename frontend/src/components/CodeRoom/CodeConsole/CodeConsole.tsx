import { useState } from "react";
import styles from "./CodeConsole.module.css";
import {
  Stack,
  Heading,
  Flex,
  Button,
  Spacer,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";
import { AttemptForm, CodeResult, QuestionObject } from "@/interfaces";
import CodeResultOutput from "../CodeResultOutput/CodeResultOutput";
import { executeCode } from "@/services/code_execution";
import { useJwt } from "@/utils/hooks";
import { createHistory } from "@/services/history";
import { PROGRAMMING_LANGUAGES } from "@/types";

interface IOwnProps {
  programmingLanguage: string;
  codeFromEditor: string;
  question: QuestionObject;
}

const BTN_SIZE = "sm";

export default function CodeConsole({
  programmingLanguage,
  codeFromEditor,
  question,
}: IOwnProps): JSX.Element {
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [codeResult, setCodeResult] = useState<CodeResult>({} as CodeResult);
  const toast = useToast();
  const token = useJwt();

  async function onRunCode() {
    setIsResultsLoading(true);
    try {
      const result: CodeResult = await executeCode(
        programmingLanguage,
        codeFromEditor,
      );
      setCodeResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsResultsLoading(false);
    }
  }

  function createAttempt(): AttemptForm {
    const matchingLanguage = PROGRAMMING_LANGUAGES.find(
      (language) => Object.values(language)[0] === programmingLanguage,
    );

    return {
      questionId: question.id,
      attempt: codeFromEditor,
      language: Object.keys(matchingLanguage as object)[0],
    };
  }

  async function onSubmitCode() {
    try {
      const newAttempt = createAttempt();
      await createHistory(newAttempt, token);
      toast({
        position: "top",
        title: "Added to history",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        position: "top",
        title: `${err.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function isBtnDisabled(): boolean {
    return !codeFromEditor || isResultsLoading;
  }

  return (
    <div className={styles.console_container}>
      <Stack>
        <Flex alignItems="center">
          <Heading size="md">Console</Heading>
          <Spacer />
          <ButtonGroup gap="1">
            <Button
              colorScheme="whiteAlpha"
              size={BTN_SIZE}
              onClick={onRunCode}
              isDisabled={isBtnDisabled()}
            >
              Run code
            </Button>
            <Button
              colorScheme="green"
              size={BTN_SIZE}
              onClick={onSubmitCode}
              isDisabled={isBtnDisabled()}
            >
              Submit
            </Button>
          </ButtonGroup>
        </Flex>
        {isResultsLoading ? (
          <SkeletonLoader />
        ) : (
          <CodeResultOutput codeResult={codeResult} />
        )}
      </Stack>
    </div>
  );
}

import { useRef, useState } from "react";
import styles from "./CodeConsole.module.css";
import {
  Stack,
  Heading,
  Flex,
  Button,
  Spacer,
  ButtonGroup,
  Textarea,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";
import {
  AttemptForm,
  CodeExplanationResult,
  CodeResult,
  QuestionObject,
} from "@/interfaces";
import CodeResultOutput from "../CodeResultOutput/CodeResultOutput";
import CodeExplanationOutput from "../CodeExplanationOutput/CodeExplanationOutput";
import { executeCode } from "@/services/code_execution";
import { createHistory } from "@/services/history";
import { PROGRAMMING_LANGUAGES } from "@/types";
import { useAuth } from "@/utils/auth";
import { explainCode, generateCode } from "@/services/collaboration";
import CodeGenerationOutput from "../CodeGenerationOutput/CodeGenerationOutput";

interface IOwnProps {
  programmingLanguage: string;
  codeFromEditor: string;
  selectedCodeFromEditor: string;
  question: QuestionObject;
}

const BTN_SIZE = "sm";

type ConsoleState =
  | { type: "none"; status: "done" }
  | {
      type: "execution";
      status: "loading";
    }
  | {
      type: "execution";
      status: "done";
      result: CodeResult;
    }
  | {
      type: "explanation";
      status: "loading";
    }
  | {
      type: "explanation";
      status: "done";
      result: CodeExplanationResult;
    }
  | {
      type: "generation";
      status: "loading";
    }
  | {
      type: "generation";
      status: "done";
      result: CodeExplanationResult;
    };

export default function CodeConsole({
  programmingLanguage,
  codeFromEditor,
  selectedCodeFromEditor,
  question,
}: IOwnProps): JSX.Element {
  const [consoleState, setConsoleState] = useState<ConsoleState>({
    type: "none",
    status: "done",
  });
  const toast = useToast();
  const { token } = useAuth();

  async function onRunCode() {
    setConsoleState({ type: "execution", status: "loading" });
    try {
      const result: CodeResult = await executeCode(
        programmingLanguage,
        codeFromEditor,
      );
      setConsoleState({ type: "execution", status: "done", result });
    } catch (e) {
      console.error(e);
      setConsoleState({ type: "none", status: "done" });
    }
  }

  async function onExplainCode() {
    setConsoleState({ type: "explanation", status: "loading" });
    try {
      const result = await explainCode(
        programmingLanguage,
        selectedCodeFromEditor === "" ? codeFromEditor : selectedCodeFromEditor,
        token,
      );
      setConsoleState({ type: "explanation", status: "done", result });
    } catch (e) {
      console.error(e);
      setConsoleState({ type: "none", status: "done" });
    }
  }

  async function onGenerateCode(description: string) {
    setConsoleState({ type: "generation", status: "loading" });
    try {
      const result = await generateCode(
        programmingLanguage,
        description,
        token,
      );
      setConsoleState({ type: "generation", status: "done", result });
    } catch (e) {
      console.error(e);
      setConsoleState({ type: "none", status: "done" });
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
    return !codeFromEditor || consoleState.status === "loading";
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
              onClick={onExplainCode}
              isDisabled={isBtnDisabled()}
            >
              {selectedCodeFromEditor !== ""
                ? "Explain selected code"
                : "Explain code"}
            </Button>
            <GenerateCodeButton onGenerate={onGenerateCode} />
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
        {(() => {
          if (consoleState.status === "loading") return <SkeletonLoader />;
          switch (consoleState.type) {
            case "execution":
              return <CodeResultOutput codeResult={consoleState.result} />;
            case "explanation":
              return <CodeExplanationOutput result={consoleState.result} />;
            case "generation":
              return <CodeGenerationOutput result={consoleState.result} />;
            case "none":
              return <></>;
          }
        })()}
      </Stack>
    </div>
  );
}

type GenerateCodeButtonProps = {
  onGenerate: (description: string) => void;
};

function GenerateCodeButton({ onGenerate }: GenerateCodeButtonProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription] = useState("");
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-end"
      initialFocusRef={textareaRef}
      colorScheme="whiteAlpha"
    >
      <PopoverTrigger>
        <Button colorScheme="whiteAlpha" size={BTN_SIZE} onClick={onToggle}>
          Generate code
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent minW="600px" bgColor="gray" color="white">
          <PopoverArrow />
          <PopoverBody>
            <Stack
              py={1}
              direction="row"
              spacing={2}
              as="form"
              onSubmit={(event) => {
                event.preventDefault();
                onGenerate(description);
                onClose();
              }}
            >
              <Textarea
                colorScheme="whiteAlpha"
                _focus={{ borderColor: "white" }}
                ref={textareaRef}
                placeholder="Function that reverses a string"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Button
                type="submit"
                colorScheme="blackAlpha"
                size={BTN_SIZE}
                disabled={description === ""}
                p="20px"
              >
                Generate
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

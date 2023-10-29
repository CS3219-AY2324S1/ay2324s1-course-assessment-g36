import { QuestionObject } from "@/interfaces"
import { Badge, Heading, Stack, Button, HStack, Select } from "@chakra-ui/react";
import QuestionComplexity from "../../Questions/QuestionComplexity/QuestionComplexity";
import QuestionDescription from "../../Questions/QuestionDescription/QuestionDescription";
import styles from "./Sidebar.module.css"
import { PROGRAMMING_LANGUAGES } from "@/types";

interface IOwnProps {
  roomId: string;
  question: QuestionObject;
  programmingLanguage: string;
  onProgrammingLanguageChange: (language: string) => void;
  onRunCode: () => void;
  onSubmitCode: () => void;
}

export default function Sidebar({
  roomId,
  question,
  programmingLanguage,
  onProgrammingLanguageChange,
  onRunCode,
  onSubmitCode
}: IOwnProps): JSX.Element {

  return <div className={styles.sidebar_container}>
    <Stack spacing='20px'>

      <HStack>
        <span className={styles.live_glowing_icon}></span>
        <span>LIVE</span>
      </HStack>

      <HStack>
        <Badge colorScheme="blue">Room ID: {roomId}</Badge>
      </HStack>

      <Select
        placeholder='Choose programming language'
        value={programmingLanguage} variant={"flushed"}
        onChange={e => onProgrammingLanguageChange(e.target.value)}
      >
        {PROGRAMMING_LANGUAGES
          .map(language => {
            const _key = Object.keys(language)[0]
            return <option
              key={_key}
              value={Object.values(language)[0]}>{_key}
            </option>
          }
          )
        }
      </Select>

      <Heading size='md'>
        {question.id}. {question.title}
      </Heading>

      <QuestionComplexity complexity={question.complexity} />

      <QuestionDescription description={question.description} />

      <HStack>
        <Button colorScheme="whiteAlpha" onClick={onRunCode}>Run code</Button>
        <Button colorScheme="green" onClick={onSubmitCode}>Submit</Button>
      </HStack>

    </Stack>
  </div>
}
import { QuestionObject } from "@/interfaces"
import { Badge, Heading, Stack, Text, Button, HStack, Select } from "@chakra-ui/react";
import QuestionComplexity from "../Questions/QuestionComplexity/QuestionComplexity";
import styles from "./Sidebar.module.css"

interface IOwnProps {
  roomId: string;
  question: QuestionObject;
  programmingLanguage: string;
  onOpen: () => void;
  handleChange: (language: string) => void;
}

export default function Sidebar({ roomId, question, programmingLanguage, onOpen, handleChange }: IOwnProps): JSX.Element {

  return <div className={styles.sidebar_container}>
    <div className={styles.sidebar}>
      <Stack spacing='20px'>
        <HStack>
          <span className={styles.live_glowing_icon}></span>
          <span>LIVE</span>
        </HStack>
        <HStack>
          <Badge colorScheme="blue">Room ID: {roomId}</Badge>
        </HStack>
        <Select placeholder='Choose programming language' value={programmingLanguage} variant={"flushed"} onChange={e => handleChange(e.target.value)}>
          <option value='python'>Python</option>
          <option value='javascript'>JavaScript</option>
          <option value='typescript'>TypeScript</option>
          <option value='java'>Java</option>
          <option value='ruby'>Ruby</option>
          <option value='cpp'>C++</option>
          <option value='csharp'>C#</option>
          <option value='php'>PHP</option>
          <option value='objectivec'>Objective-C</option>
        </Select>
        <Heading size='md'>
          {question.id}. {question.title}
        </Heading>
        <QuestionComplexity complexity={question.complexity} />
        <Text>
          {question.description.split('\n').map(desc => <p key={desc}>{desc}<br /></p>)}
        </Text>
        <Button colorScheme="green" onClick={onOpen}>Run code</Button>
      </Stack>
    </div>
  </div>
}
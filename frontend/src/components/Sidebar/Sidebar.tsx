import { QuestionObject } from "@/interfaces"
import { Badge, Heading, Stack, Text, Button, HStack } from "@chakra-ui/react";
import QuestionComplexity from "../Questions/QuestionComplexity/QuestionComplexity";
import styles from "./Sidebar.module.css"

interface IOwnProps {
  roomId: string;
  question: QuestionObject;
  onOpen: () => void;
}

export default function Sidebar({ roomId, question, onOpen }: IOwnProps): JSX.Element {

  return <div className={styles.sidebar_container}>
    <div className={styles.sidebar}>
      <Stack spacing='20px'>
        <HStack>
          <Badge colorScheme="blue">Room ID: {roomId}</Badge>
        </HStack>
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
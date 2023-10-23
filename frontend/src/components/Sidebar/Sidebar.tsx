import { QuestionObject } from "@/interfaces"
import { Badge, Heading, Stack, Text, Button, HStack } from "@chakra-ui/react";
import QuestionComplexity from "../Questions/QuestionComplexity/QuestionComplexity";
import styles from "./Sidebar.module.css"

interface IOwnProps {
  roomId: string;
  onOpen: () => void;
}

export default function Sidebar({ roomId, onOpen }: IOwnProps): JSX.Element {

  const question = "The DNA sequence is composed of a series of nucleotides abbreviated as 'A','C', 'G', and 'T'\n\nFor example, 'ACGAATTCCG' is a DNA sequence. When studying DNA, it is useful to identify repeated sequences within the DNA.\n\nGiven a string s that represents a DNA sequence, return all the 10-letter long sequences (substrings) that occur more than once in a DNA molecule.\n\nYou may return the answer in any order."

  return <div className={styles.sidebar_container}>
    <div className={styles.sidebar}>
      <Stack spacing='20px'>
        <HStack>
          <Badge colorScheme="blue">Room ID: {roomId}</Badge>
        </HStack>
        {/* {question.id}. {question.title} */}
        <Heading size='md'>
          8. Repeated DNA Sequences
        </Heading>
        <QuestionComplexity complexity="Medium" />
        <Text>
          {/* {question.description.split('\n').map(desc => <p key={desc}>{desc}<br /></p>)} */}
          {question.split('\n').map(desc => <p key={desc}>{desc}<br /></p>)}
        </Text>
        <Button colorScheme="green" onClick={onOpen}>Run code</Button>
      </Stack>
    </div>
  </div>
}
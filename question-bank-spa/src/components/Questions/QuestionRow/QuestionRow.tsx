import {
  Tr,
  Td,
  Button,
} from '@chakra-ui/react'
import QuestionTitle from '../QuestionTitle/QuestionTitle'
import QuestionTopic from '../QuestionTopic/QuestionTopic'
import QuestionComplexity from '../QuestionComplexity/QuestionComplexity'
import { QuestionObject } from '@/data/interface'

interface IOwnProps {
  question: QuestionObject
  deleteQuestion: (questionTitle: string) => void
}

export default function QuestionRow({ question, deleteQuestion }: IOwnProps): JSX.Element {
  return (
    <Tr>
      <Td><QuestionTitle question={question} /></Td>
      <Td><QuestionComplexity complexity={question.complexity}/></Td>
      <Td><QuestionTopic categories={question.categories}/></Td>
      <Td><Button size="xs" colorScheme="red" onClick={() => deleteQuestion(question.title)}>X</Button></Td>
    </Tr>

  )
}
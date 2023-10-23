import {
  Tr,
  Td,
  Button,
} from '@chakra-ui/react'
import QuestionTitle from '../QuestionTitle/QuestionTitle'
import QuestionTopic from '../QuestionTopic/QuestionTopic'
import QuestionComplexity from '../QuestionComplexity/QuestionComplexity'
import { QuestionObject } from '@/interfaces'

interface IOwnProps {
  question: QuestionObject
  deleteQuestion: (questionId: number) => void
}

export default function QuestionRow({ question, deleteQuestion }: IOwnProps): JSX.Element {
  return (
    <Tr>
      <Td><QuestionTitle question={question} /></Td>
      <Td><QuestionComplexity complexity={question.complexity}/></Td>
      <Td><QuestionTopic categories={question.categories}/></Td>
      <Td><Button size="xs" colorScheme="red" onClick={() => deleteQuestion(question.id)}>X</Button></Td>
    </Tr>

  )
}
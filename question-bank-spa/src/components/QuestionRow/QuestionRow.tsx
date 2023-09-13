import {
  Tr,
  Td,
} from '@chakra-ui/react'
import QuestionTopic from '../QuestionTopic/QuestionTopic'
import QuestionComplexity from '../QuestionComplexity/QuestionComplexity'

interface IOwnProps {
  title: string
  categories: string[]
  complexity: string
}

export default function QuestionRow({ title, categories, complexity }: IOwnProps): JSX.Element {
  return (
    <Tr>
      <Td>{ title }</Td>
      <Td><QuestionComplexity complexity={complexity}/></Td>
      <Td><QuestionTopic categories={categories}/></Td>
    </Tr>

  )
}
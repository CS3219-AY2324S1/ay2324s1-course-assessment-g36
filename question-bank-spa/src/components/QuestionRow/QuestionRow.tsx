import {
  Tr,
  Td,
} from '@chakra-ui/react'
import QuestionTitle from '../QuestionTitle/QuestionTitle'
import QuestionTopic from '../QuestionTopic/QuestionTopic'
import QuestionComplexity from '../QuestionComplexity/QuestionComplexity'

interface IOwnProps {
  title: string
  categories: string[]
  complexity: string
  description: string
  link: string
}

export default function QuestionRow({ title, categories, complexity, description, link }: IOwnProps): JSX.Element {
  return (
    <Tr>
      <Td><QuestionTitle title={title} description={description} link={link} /></Td>
      <Td><QuestionComplexity complexity={complexity}/></Td>
      <Td><QuestionTopic categories={categories}/></Td>
    </Tr>

  )
}
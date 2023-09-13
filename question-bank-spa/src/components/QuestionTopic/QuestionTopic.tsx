import { Stack, Badge } from '@chakra-ui/react'

interface IOwnProps {
  categories: string[]
}

export default function QuestionTopic({ categories }: IOwnProps): JSX.Element {
  return <Stack direction="row">
    {categories.map(category => <Badge colorScheme='blackAlpha'>{category}</Badge>)}
  </Stack>
}
import { Stack, Badge } from '@chakra-ui/react'

interface IOwnProps {
  categories: string[]
}

export default function QuestionTopic({ categories }: IOwnProps): JSX.Element {
  return <Stack direction="row" wrap="wrap">
    {categories.map(category => <Badge key={category} colorScheme='blackAlpha'>{category}</Badge>)}
  </Stack>
}
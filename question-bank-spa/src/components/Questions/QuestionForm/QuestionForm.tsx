import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Input,
  Textarea,
  Select,
  Button,
  Radio,
  RadioGroup,
  useToast
} from '@chakra-ui/react'
import { QuestionObject } from '@/data/interface'

interface IOwnProps {
  onModalClose: () => void
  addQuestion: (newQuestion: QuestionObject) => void
}

export default function QuestionForm({ onModalClose, addQuestion }: IOwnProps): JSX.Element {

  const [form, setFormData] = useState<QuestionObject>(
    { id: 1225, title: "", complexity: "", description: "", categories: [], link: "" 
  })

  const toast = useToast()

  const CATEGORIES_OPTIONS = [
    'Array', 'Strings', 'Recursion', 'Dynamic Programming', 'Greedy',
    'Backtracking', 'Graph', 'Linked List', 'Matrix', 'Tree',
    'Heap (Priority Queue)', 'Stack', 'Queue', 'Database',
    'Binary Search', 'Hash Table', 'Math'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName: string) => {
    if (fieldName === "category") {
      setFormData({ ...form, categories: [e.target.value] })
    } else {
      setFormData({ ...form, [fieldName]: e.target.value })
    }
  };

  function isDuplicateTitleExist() {
    return !!localStorage.getItem(form.title)
  }

  function canSubmit() {
    return isDuplicateTitleExist();
  }

  function handleSubmit() {
    addQuestion(form)
    onModalClose();
    toast({
      title: 'Question created.',
      status: 'success',
      duration: 2000,
      position: 'top',
      isClosable: true
    })
  }

  return (
    <Stack>

      <FormControl isRequired isInvalid={isDuplicateTitleExist()}>
        <Input value={form.title} placeholder="Title" onChange={(e) => handleChange(e, "title")} />
        <FormErrorMessage>Question with this title already exists.</FormErrorMessage>
      </FormControl>

      <Textarea value={form.description} placeholder="Description" onChange={(e) => handleChange(e, "description")} />

      <Input value={form.link} placeholder="External link" onChange={(e) => handleChange(e, "link")} />

      <Select value={form.categories[0]} placeholder='Category' onChange={(e) => handleChange(e, "category")} >
        {CATEGORIES_OPTIONS.map(category => <option key={category} value={category}>{category}</option>)}
      </Select>

      <FormControl>
        <FormLabel>
          Complexity
        </FormLabel>
        <RadioGroup>
          <Stack direction='row'>
            <Radio value='Easy' onChange={(e) => handleChange(e, "complexity")}>Easy</Radio>
            <Radio value='Medium' onChange={(e) => handleChange(e, "complexity")}>Medium</Radio>
            <Radio value='Hard' onChange={(e) => handleChange(e, "complexity")}>Hard</Radio>
          </Stack>
        </RadioGroup>
        </FormControl>

      <Button colorScheme='blue' disabled={canSubmit()} onClick={handleSubmit}>Submit</Button>
    </Stack>
  )

}
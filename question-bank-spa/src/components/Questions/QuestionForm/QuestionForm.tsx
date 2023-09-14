import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Stack,
  Input,
  Textarea,
  Select,
  Button,
  Radio,
  RadioGroup,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box
} from '@chakra-ui/react'
import { QuestionObject } from '@/data/interface'
import { validateForm } from '@/utils/validators'

interface IOwnProps {
  onModalClose: () => void
  addQuestion: (newQuestion: QuestionObject) => void
}

export default function QuestionForm({ onModalClose, addQuestion }: IOwnProps): JSX.Element {

  const [form, setFormData] = useState<QuestionObject>(
    {
      id: 1225, title: "", complexity: "", description: "", categories: [], link: ""
    })
  const [isFormError, setIsFormError] = useState<boolean>(false)
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

  function isDisabled(): boolean {
    return form.title === ""
      || form.description === ""
      || form.complexity === ""
      || form.categories.length === 0
      || form.link === ""
  }

  function handleSubmit(): void {
    if (!validateForm(form)) {
      setIsFormError(true)
      return
    }
    setIsFormError(false)
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

      {isFormError && <>
        <Alert status='error'>
          <AlertIcon />
          <Box>
            <AlertTitle>Your form has some errors!</AlertTitle>
            <AlertDescription>
              Please ensure that there is no duplicate question title and your external link is valid.
            </AlertDescription>
          </Box>
        </Alert>
      </>}

      <FormControl isRequired>
        <FormLabel>
          Title
        </FormLabel>
        <Input value={form.title} placeholder="Number of Islands" onChange={(e) => handleChange(e, "title")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          Description
        </FormLabel>
        <Textarea value={form.description} placeholder="Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands." onChange={(e) => handleChange(e, "description")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          External Link
        </FormLabel>
        <Input value={form.link} placeholder="https://leetcode.com/problems/number-of-islands/" onChange={(e) => handleChange(e, "link")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          Category
        </FormLabel>
        <Select value={form.categories[0]} placeholder='Category' onChange={(e) => handleChange(e, "category")} >
          {CATEGORIES_OPTIONS.map(category => <option key={category} value={category}>{category}</option>)}
        </Select>
      </FormControl>

      <FormControl isRequired>
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

      <Button colorScheme='blue' isDisabled={isDisabled()} onClick={handleSubmit}>Submit</Button>
    </Stack>
  )

}
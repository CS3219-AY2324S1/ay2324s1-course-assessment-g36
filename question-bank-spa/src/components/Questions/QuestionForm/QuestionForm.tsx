import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Stack,
  Input,
  Textarea,
  Button,
  Radio,
  RadioGroup,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Checkbox,
  CheckboxGroup
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
      id: Math.floor(Math.random() * 100) + 15, title: "", complexity: "", description: "", categories: [], link: ""
    })
  const [isFormError, setIsFormError] = useState<boolean>(false)
  const toast = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    if (fieldName === "categories") {
      handleCheckboxChange(e.target.value);
    } else {
      setFormData({ ...form, [fieldName]: e.target.value })
    }
  };

  const handleCheckboxChange = (input: string) => {
    if (form.categories.includes(input)) {
      setFormData({ ...form, categories: form.categories.filter(item => item !== input) })
    } else {
      setFormData({ ...form, categories: [...form.categories, input] })
    }
  }

  const CATEGORIES_OPTIONS = [
    'Array', 'String', 'Tree', 'Stack', 'Queue',
    'Matrix', 'Database', 'Hash Table', 'Linked List',
    'Graph', 'Binary Search', 'Heap (Priority Queue)', 
    'Recursion', 'Greedy', 'Math', 'Backtracking', 'Dynamic Programming'
  ]

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
        <CheckboxGroup colorScheme='blue'>
          <Stack spacing={5} direction='row' wrap="wrap">
            {CATEGORIES_OPTIONS
              .slice(0, 7)
              .map(category =>
                <Checkbox key={category} value={category} onChange={(e) => handleChange(e, "categories")}>{category}</Checkbox>
              )}
          </Stack>
          <Stack spacing={5} direction='row' wrap="wrap">
            {CATEGORIES_OPTIONS
              .slice(7, 12)
              .map(category =>
                <Checkbox key={category} value={category} onChange={(e) => handleChange(e, "categories")}>{category}</Checkbox>
              )}
          </Stack>
          <Stack spacing={5} direction='row' wrap="wrap">
            {CATEGORIES_OPTIONS
              .slice(12)
              .map(category =>
                <Checkbox key={category} value={category} onChange={(e) => handleChange(e, "categories")}>{category}</Checkbox>
              )}
          </Stack>
        </CheckboxGroup>
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
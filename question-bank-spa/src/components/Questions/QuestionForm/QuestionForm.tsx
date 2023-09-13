import { useState } from 'react'
import {
  FormControl,
  FormErrorMessage,
  Stack,
  Input,
  Textarea,
  Select,
  Button
} from '@chakra-ui/react'
import { QuestionObject } from '@/data/interface'
export default function QuestionForm(): JSX.Element {

  const [form, setFormData] = useState<QuestionObject>({ id: 1223, title: "", complexity: "", description: "", categories: [], link: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, fieldName: string) => {
    setFormData({
      ...form,
      [fieldName]: e.target.value,
    });
  };

  function isDuplicateTitleExist() {
    return !!localStorage.getItem(form.title)
  }

  function canSubmit() {
    return isDuplicateTitleExist();
  }

  return (
    <Stack>

      <FormControl isRequired isInvalid={isDuplicateTitleExist()}>
        <Input value={form.title} placeholder="Title" onChange={(e) => handleChange(e, "title")} />
        <FormErrorMessage>Question with this title already exists.</FormErrorMessage>
      </FormControl>

      <Textarea value={form.description} placeholder="Description" onChange={(e) => handleChange(e, "description")} />

      <Select value={form.complexity} placeholder='Complexity' onChange={(e) => handleChange(e, "complexity")} >
        <option value='Easy'>Easy</option>
        <option value='Medium'>Medium</option>
        <option value='Hard'>Hard</option>
      </Select>

      <Input value={form.link} placeholder="External link" onChange={(e) => handleChange(e, "link")} />

      <Button colorScheme='blue' disabled={canSubmit()}>Submit</Button>
    </Stack>
  )

}
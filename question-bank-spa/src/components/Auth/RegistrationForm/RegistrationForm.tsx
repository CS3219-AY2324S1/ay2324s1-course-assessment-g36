import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
} from '@chakra-ui/react'
import styles from "./RegistrationForm.module.css"
import { User, UserForm } from '@/interfaces'
import { createUser } from '@/utils/api'

export default function RegistrationForm(): JSX.Element {

  const [show, setShow] = useState<boolean>(false)
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false)
  const [userForm, setUserForm] = useState<UserForm>({
    username: "",
    email: "",
    password: ""
  })

  const handlePasswordClick = () => setShow(!show)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setUserForm({ ...userForm, [fieldName]: e.target.value })
  };

  const handleSubmit = async (userForm: UserForm): Promise<void> => {
    try {
      setIsFormSubmitting(true)
      const user: User = await createUser(userForm)
      window.location.href = `/profile/${user.userId}`
    } catch (error) {
      console.log("Error creating a new user")
    }
  }

  function isDisabled(): boolean {
    return userForm.username == ""
      || userForm.email == ""
      || userForm.password == ""
      || isFormSubmitting
  }

  return (
    <Stack className={styles.form_container} spacing='20px'>
      <Heading as='h2' size='xl' textAlign='center'>User Registration</Heading>

      <FormControl isRequired>
        <FormLabel>
          Username
        </FormLabel>
        <Input placeholder="Enter username" value={userForm.username} onChange={e => handleChange(e, "username")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          Email address
        </FormLabel>
        <Input placeholder="Enter email address" value={userForm.email} onChange={e => handleChange(e, "email")} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>
          Password
        </FormLabel>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            value={userForm.password} onChange={e => handleChange(e, "password")}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handlePasswordClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button colorScheme='blue' isDisabled={isDisabled()} onClick={(e) => handleSubmit(userForm)}>
        {isFormSubmitting ? "Creating..." : "Create Account"}
      </Button>
    </Stack>
  )
}


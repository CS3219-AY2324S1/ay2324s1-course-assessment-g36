import { useState, useEffect } from "react"
import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  useToast,
  Text
} from '@chakra-ui/react'
import { UpdateUserProfileForm } from "@/interfaces"
import { fetchUser, updateUser } from "@/utils/userApi"
import { useRouter } from 'next/router'
import SkeletonLoader from "@/components/Loader/SkeletonLoader"
import { Status } from "@/enums"
import { validatePassword } from "@/utils/validators"

export default function ProfileUpdate() {

  const [status, setStatus] = useState<Status>(Status.Loading)
  const [error, setError] = useState<string>("")
  const [show, setShow] = useState<boolean>(false)
  const handlePasswordClick = () => setShow(!show)
  const router = useRouter()
  const userId = router.query.id as string
  const toast = useToast()

  const [userProfileData, setUserProfileData] = useState<UpdateUserProfileForm>({
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "summary": "",
    "education": "",
    "work": "",
    "github": "",
    "website": ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setUserProfileData({ ...userProfileData, [fieldName]: e.target.value })
  };

  async function fetchData(id: string) {

    try {
      const results = await fetchUser(id);
      setUserProfileData({...results, password: ""})
      setStatus(Status.Success)
    } catch (error: any) {
      setError(error.message)
      setStatus(Status.Error)
    }

  }

  async function handleSubmit() {

    if (userProfileData.password.length > 0 && !validatePassword(userProfileData.password)) {
      toast({
        position: 'top',
        title: 'Please ensure password is at least 8 characters long.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    try {
      await updateUser(userId, userProfileData)
      toast({
        position: 'top',
        title: 'Profile updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        position: 'top',
        title: `${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

  }

  useEffect(() => {
    fetchData(userId)
  }, [userId])

  return (
    <>
      <Head>
        <title>PeerPrep: Update profile</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>

          {status === Status.Loading ? <SkeletonLoader /> : <></>}

          {status === Status.Error ? <Text color='red'>{error}</Text> : <></>}

          {status === Status.Success
            ? <Container maxW='2xl'>
              <Stack>

                <HStack>
                  <FormControl>
                    <FormLabel>
                      First name
                    </FormLabel>
                    <Input placeholder="Enter first name" value={userProfileData.firstName} onChange={e => handleChange(e, "firstName")} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Last name
                    </FormLabel>
                    <Input placeholder="Enter last name" value={userProfileData.lastName} onChange={e => handleChange(e, "lastName")} />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel>
                    Username
                  </FormLabel>
                  <Input placeholder="Enter username" value={userProfileData.username} onChange={e => handleChange(e, "username")} />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show ? 'text' : 'password'}
                      placeholder='Enter password'
                      value={userProfileData.password}
                      onChange={e => handleChange(e, "password")}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handlePasswordClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>
                    About you
                  </FormLabel>
                  <Input placeholder="Enter summary" value={userProfileData.summary} onChange={e => handleChange(e, "summary")} />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    Education
                  </FormLabel>
                  <Input placeholder="What is your highest educational qualification?" value={userProfileData.education} onChange={e => handleChange(e, "education")} />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    Professional work
                  </FormLabel>
                  <Input placeholder="What is your professional job?" value={userProfileData.work} onChange={e => handleChange(e, "work")} />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    GitHub profile
                  </FormLabel>
                  <Input placeholder="Enter GitHub link" value={userProfileData.github} onChange={e => handleChange(e, "github")} />
                </FormControl>

                <FormControl>
                  <FormLabel>
                    Website
                  </FormLabel>
                  <Input placeholder="Enter website" value={userProfileData.website} onChange={e => handleChange(e, "website")} />
                </FormControl>

                <Button onClick={handleSubmit}>Save</Button>
                <br />

              </Stack>
            </Container>
            : <></>}

        </Layout>
      </main>
    </>
  )
}

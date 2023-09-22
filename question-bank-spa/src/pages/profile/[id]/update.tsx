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
  useToast
} from '@chakra-ui/react'
import { User, UpdateUserProfileForm } from "@/interfaces"
import { fetchUser, updateUser } from "@/utils/api"
import { useRouter } from 'next/router'

export default function ProfileUpdate() {

  const [show, setShow] = useState<boolean>(false)
  const handlePasswordClick = () => setShow(!show)
  const toast = useToast()

  const [profileData, setProfileData] = useState<User>({
    "userId": 0,
    "email": "",
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "summary": "",
    "education": "",
    "work": "",
    "github": "",
    "website": "",
    "createdAt": "",
    "updatedAt": ""
  })

  const [userProfileData, setUserProfileData] = useState<UpdateUserProfileForm>({
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "summary": "",
    "education": "",
    "work": "",
    "github": "",
    "website": "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setUserProfileData({ ...userProfileData, [fieldName]: e.target.value })
  };

  const router = useRouter()
  const userId = router.query.id as string

  async function fetchData(id: string) {
    try {
      const results = await fetchUser(id);
      setProfileData(results)
    } catch (error) {
      console.log("Error fetching users;")
    }
  }

  useEffect(() => {
    fetchData(userId)
  }, [userId])

  async function handleSubmit() {
    try {
      await updateUser(userId, userProfileData)
      toast({
        position: 'top',
        title: 'Profile updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.log("Error updating profile")
    }
  }

  return (
    <>
      <Head>
        <title>PeerPrep Question Bank: Update profile</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>

          <Container maxW='2xl'>
            <Stack>

              <HStack>
                <FormControl>
                  <FormLabel>
                    First name
                  </FormLabel>
                  {/* TODO: fix bug where updated fields cannot be updated again */}
                  <Input placeholder="Enter first name" value={profileData.firstName} onChange={e => handleChange(e, "firstName")}/>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Last name
                  </FormLabel>
                  <Input placeholder="Enter last name" value={profileData.lastName} onChange={e => handleChange(e, "lastName")}/>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>
                  Username
                </FormLabel>
                <Input placeholder="Enter username" value={profileData.username} onChange={e => handleChange(e, "username")}/>
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
                <Input placeholder="Enter summary" value={profileData.summary} onChange={e => handleChange(e, "summary")}/>
              </FormControl>

              <FormControl>
                <FormLabel>
                  Professional work
                </FormLabel>
                <Input placeholder="What is your professional job?" value={profileData.work} onChange={e => handleChange(e, "work")} />
              </FormControl>

              <FormControl>
                <FormLabel>
                  GitHub profile
                </FormLabel>
                <Input placeholder="Enter GitHub link" value={profileData.github} onChange={e => handleChange(e, "github")} />
              </FormControl>

              <FormControl>
                <FormLabel>
                  Website
                </FormLabel>
                <Input placeholder="Enter website" value={profileData.website} onChange={e => handleChange(e, "website")} />
              </FormControl>

              <Button onClick={handleSubmit}>Save</Button>
              <br />

            </Stack>
          </Container>

        </Layout>
      </main>
    </>
  )
}

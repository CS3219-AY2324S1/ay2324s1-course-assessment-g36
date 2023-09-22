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
  Container
} from '@chakra-ui/react'
import { UpdateUserProfileForm } from "@/interfaces"
import { updateUser } from "@/utils/api"
import { useRouter } from 'next/router'

export default function ProfileUpdate() {

  const [show, setShow] = useState<boolean>(false)
  const handlePasswordClick = () => setShow(!show)

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


  const router = useRouter()

  useEffect(() => {
    const userId = router.query.id as string
    console.log(userId)
  }, [])
  

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
                  <Input placeholder="Enter first name" />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Last name
                  </FormLabel>
                  <Input placeholder="Enter last name" />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>
                  Username
                </FormLabel>
                <Input placeholder="Enter username" />
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
                <Input placeholder="Enter summary" />
              </FormControl>

              <FormControl>
                <FormLabel>
                  Professional work
                </FormLabel>
                <Input placeholder="What is your professional job?" />
              </FormControl>

              <FormControl>
                <FormLabel>
                  GitHub profile
                </FormLabel>
                <Input placeholder="Enter GitHub link" />
              </FormControl>

              <FormControl>
                <FormLabel>
                  Website
                </FormLabel>
                <Input placeholder="Enter website" />
              </FormControl>

              <Button>Save</Button>
              <br />

            </Stack>
          </Container>

        </Layout>
      </main>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Fetch data based on the dynamic slug value on the server
  const response = await fetch(`/api/posts/${slug}`);
  const postData = await response.json();

  return {
    props: {
      postData,
    },
  };
}
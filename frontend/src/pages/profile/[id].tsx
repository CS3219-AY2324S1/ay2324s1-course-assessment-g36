import { useState, useEffect } from "react"
import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import { User } from "@/interfaces"
import { fetchUser } from "@/services/users"
import { Heading, HStack, Stack, Text, Button, useToast } from '@chakra-ui/react'
import { deleteUser } from "@/services/users"
import Link from "next/link"
import { Status } from "@/enums"
import SkeletonLoader from "@/components/Loader/SkeletonLoader"
import { useJwt, useUserId } from "@/utils/hooks"

export default function ProfileDetail() {

  const [status, setStatus] = useState<Status>(Status.Loading)
  const [error, setError] = useState<string>("")
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
  const router = useRouter()
  const userId = router.query.id as string
  const toast = useToast()
  const token = useJwt()
  const currUserId = `${useUserId()}`;

  async function fetchData(id: string) {

    try {
      const results = await fetchUser(id, token);
      setProfileData(results)
      setStatus(Status.Success)
    } catch (error: any) {
      setError(error.message)
      setStatus(Status.Error)
    }

  }

  useEffect(() => {
    fetchData(userId)
  }, [userId])

  async function handleDelete() {
    try {
      await deleteUser(userId, token)
      window.location.href = "/profiles";
    } catch (error: any) {
      toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true
      })
    }
  }

  return (
    <>
      <Head>
        <title>PeerPrep: View profiles</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>

          {status === Status.Loading ? <SkeletonLoader /> : <></>}

          {status === Status.Error
            ? <Text color='red'>{ error }</Text>
            : <></>
          }

          {status === Status.Success
            ? <Stack>
              <Heading lineHeight='tall'>
                Welcome to {profileData.username}&apos;s profile
              </Heading>
              <Text>Name: {`${profileData.firstName ?? ""} ${profileData.lastName ?? ""}`}</Text>
              <Text>Education: {profileData.education}</Text>
              <Text>About you: {profileData.summary}</Text>
              <Text>Professional work: {profileData.work}</Text>
              <Text>GitHub link: {profileData.github} </Text>
              <Text>Website: {profileData.website} </Text>
              <Text>Contact: {profileData.email} </Text>
              <HStack>
                {/* only allow update if it's the current user */}
                {currUserId === userId && <Link href={`/profile/${userId}/update`}>
                  <Button colorScheme="teal">
                    Update Profile
                  </Button>
                </Link>}
                <Button colorScheme="red" onClick={handleDelete}>Delete Account</Button>
              </HStack>
            </Stack>
            : <></>}

        </Layout>
      </main >
    </>
  )
}
import { useState, useEffect } from "react"
import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import { User } from "@/interfaces"
import { fetchUser } from "@/utils/api"
import { Heading, HStack, Stack, Text, Button } from '@chakra-ui/react'
import { deleteUser } from "@/utils/api"

export default function ProfileDetail() {

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
  },)
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

  async function handleDelete() {
    try {
      await deleteUser(userId)
      window.location.href = "/profiles";
    } catch (error) {
      console.log("Error deleting user")
    }
  }

  return (
    <>
      <Head>
        <title>PeerPrep Question Bank: View profiles</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Stack>
            <Heading lineHeight='tall'>
              Welcome to {profileData.username}'s profile
            </Heading>
            <Text>Name: {`${profileData.firstName ?? ""} ${profileData.lastName ?? ""}`}</Text>
            <Text>Education: {profileData.education}</Text>
            <Text>About you: {profileData.summary}</Text>
            <Text>Professional work: {profileData.work}</Text>
            <Text>GitHub link: {profileData.github} </Text>
            <Text>Website: {profileData.website} </Text>
            <Text>Contact: {profileData.email} </Text>
            <HStack>
              <Button colorScheme="teal">Update Profile</Button>
              <Button colorScheme="red" onClick={handleDelete}>Delete Account</Button>
            </HStack>
          </Stack>
        </Layout>
      </main >
    </>
  )
}
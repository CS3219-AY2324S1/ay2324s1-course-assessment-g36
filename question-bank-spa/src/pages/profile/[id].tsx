import { useState, useEffect } from "react"
import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import { User } from "@/interfaces"
import { fetchUser } from "@/utils/api"
import { Heading, Stack, Text } from '@chakra-ui/react'

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
    "github": "No url added",
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
  }, [])

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
              Welcome to { profileData.username }'s profile
            </Heading>
            <Text>Education: { profileData.education }</Text>
            <Text>Summary: { profileData.summary }</Text>
            <Text>GitHub link: { profileData.github } </Text>
            <Text>Contact: { profileData.email } </Text>
          </Stack>
        </Layout>
      </main >
    </>
  )
}
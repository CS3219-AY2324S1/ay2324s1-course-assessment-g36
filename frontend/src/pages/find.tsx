import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import { Stack, Heading, Text, Button } from '@chakra-ui/react'

export default function Lobby() {

  function handleClick() {
    window.location.href = `/room/${Math.floor(Math.random() * 10000)}`
  }

  return (
    <>
      <Head>
        <title>PeerPrep: Lobby</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Stack gap='16px'>
            <Heading>Lobby</Heading>
            <Text>
              By clicking Find below, we will help you match with a peer
              to practice technical interview questions.
            </Text>
            <Button onClick={handleClick}>Find</Button>
          </Stack>
        </Layout>
      </main>
    </>
  )
}

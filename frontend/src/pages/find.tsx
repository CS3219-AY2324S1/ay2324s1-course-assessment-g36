import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import { Flex, Stack, Heading, Text, Button } from '@chakra-ui/react'
import Image from 'next/image'


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
          <Flex alignItems="center">
            <Image
              src="/pair_programming.png"
              width={600}
              height={600}
              alt="Picture of the author"
            />
            <Stack gap='16px'>
              <Heading>Lobby</Heading>
              <Text>
                Find a peer to practice technical interview questions.
              </Text>
              <Button onClick={handleClick}>Find</Button>
            </Stack>
          </Flex>
        </Layout>
      </main>
    </>
  )
}

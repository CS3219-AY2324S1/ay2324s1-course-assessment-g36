import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import MatchingForm from '@/components/Matching/MatchingForm'

export default function Matching() {
  return (
    <>
      <Head>
        <title>PeerPrep: Matching</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <MatchingForm />
        </Layout>
      </main>
    </>
  )
}

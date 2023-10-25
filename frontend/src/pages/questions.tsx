import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import QuestionsTable from '@/components/Questions/QuestionsTable/QuestionsTable'
import { useJwtToken } from '@/utils/hooks'

export default function Questions() {
  const token = useJwtToken()
  return (
    <>
      <Head>
        <title>PeerPrep</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <QuestionsTable />
        </Layout>
      </main>
    </>
  )
}

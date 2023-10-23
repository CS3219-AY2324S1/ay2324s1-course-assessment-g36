import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import OldCodeEditor from '@/components/CodeEditor/OldCodeEditor'
import CodeEditor from '@/components/CodeEditor/CodeEditor'

export default function CodeRoom() {
  return (
    <>
      <Head>
        <title>PeerPrep: Collaborative code room</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* <Layout> */}
        <CodeEditor />
        {/* </Layout> */}
      </main>
    </>
  )
}

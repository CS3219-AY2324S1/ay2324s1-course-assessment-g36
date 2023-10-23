import Head from 'next/head'
import CodeEditor from "@/components/CodeEditor/CodeEditor"

interface PageProps {
  id: string;
}

export default function CodeRoom({ id }: PageProps) {
  return (
    <>
      <Head>
        <title>PeerPrep: Collaborative code room</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CodeEditor roomId={id} />
      </main >
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { query } = context;

  // Access the 'id' query parameter from the URL
  const { id } = query;

  return {
    props: {
      id,
    },
  };
}

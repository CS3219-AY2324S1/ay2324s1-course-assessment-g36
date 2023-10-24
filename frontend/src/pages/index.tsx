import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import QuestionsTable from "@/components/Questions/QuestionsTable/QuestionsTable";

// TODO: get user and decide to go to either questions or login
export default function Home() {
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
  );
}

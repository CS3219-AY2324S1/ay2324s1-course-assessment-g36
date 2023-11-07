import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import QuestionsTable from "@/components/Questions/QuestionsTable/QuestionsTable";
import { useAuth } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Questions() {
  const router = useRouter();
  const auth = useAuth();

  // Redirect unauthenticated users to login page.
  useEffect(() => {
    if (auth.state === "unauthenticated") {
      router.replace("/login");
    }
  }, [auth]);

  // Loading.
  if (auth.state === "uninitialized") return <></>;

  return (
    <>
      <Head>
        <title>PeerPrep</title>
        <meta
          name="description"
          content="Question bank to ace your technical interviews"
        />
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

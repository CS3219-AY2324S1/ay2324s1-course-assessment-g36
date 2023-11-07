import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import ProfileList from "@/components/Users/ProfileList/ProfileList";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";
import { useEffect } from "react";

export default function Profiles() {
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
        <title>PeerPrep: View profiles</title>
        <meta
          name="description"
          content="Question bank to ace your technical interviews"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <ProfileList />
        </Layout>
      </main>
    </>
  );
}

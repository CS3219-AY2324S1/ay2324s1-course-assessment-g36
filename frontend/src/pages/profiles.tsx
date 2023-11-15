import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import ProfileList from "@/components/Users/ProfileList/ProfileList";
import { useRedirectUnauthenticatedUser } from "@/utils/hooks";

export default function Profiles() {
  const authRedirect = useRedirectUnauthenticatedUser();

  if (authRedirect.isLoading) return <></>;

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

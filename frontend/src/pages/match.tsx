import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import MatchingForm from "@/components/Matching/MatchingForm";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import { useAuth } from "@/utils/auth";
import { useRouter } from "next/router";

export default function Matching() {
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
        <title>PeerPrep: Matching</title>
        <meta
          name="description"
          content="Question bank to ace your technical interviews"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Flex justifyContent="center" alignItems="center">
            <Image
              src="/pair_programming.png"
              width={600}
              height={600}
              alt="Pair programming"
            />
            <MatchingForm />
          </Flex>
        </Layout>
      </main>
    </>
  );
}

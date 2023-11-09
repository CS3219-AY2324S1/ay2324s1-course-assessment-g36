import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import MatchingForm from "@/components/Matching/MatchingForm";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";

export default function Matching() {
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

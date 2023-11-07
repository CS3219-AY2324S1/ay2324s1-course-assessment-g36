import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout/Layout";
import HistoryTable from "@/components/History/HistoryTable/HistoryTable";
import { fetchAllHistoryByUser } from "@/services/history";
import { Status } from "@/enums";
import { Attempt } from "@/interfaces";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";
import { Text } from "@chakra-ui/react";
import { useJwt } from "@/utils/hooks";

export default function History() {
  const [status, setStatus] = useState<Status>(Status.Loading);
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<Attempt[]>([]);
  const token = useJwt();

  async function fetchData() {
    try {
      const results = await fetchAllHistoryByUser(token);
      setHistory(results);
      setStatus(Status.Success);
    } catch (error: any) {
      setError(error.message);
      setStatus(Status.Error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>PeerPrep: History</title>
        <meta
          name="description"
          content="Question bank to ace your technical interviews"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          {status === Status.Loading ? <SkeletonLoader /> : <></>}

          {status === Status.Error ? <Text color="red">{error}</Text> : <></>}

          {status === Status.Success ? (
            <HistoryTable history={history} />
          ) : (
            <></>
          )}
        </Layout>
      </main>
    </>
  );
}

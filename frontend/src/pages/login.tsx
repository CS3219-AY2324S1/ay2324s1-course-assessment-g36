import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import LoginForm from "@/components/Users/Login/LoginForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>PeerPrep: Login</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <LoginForm />
        </Layout>
      </main>
    </>
  );
}

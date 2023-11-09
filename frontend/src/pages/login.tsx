import Head from "next/head";
import LoginForm from "@/components/Users/Login/LoginForm";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginLayout from "@/components/Layout/LoginLayout";
import { useAuth } from "@/utils/auth";

export default function Login() {
  const router = useRouter();
  const auth = useAuth();

  // Redirect authenticated users to page specified in `redirect_to`, or the questions page.
  useEffect(() => {
    if (auth.state === "authenticated") {
      const redirectTo =
        typeof router.query.redirect_to === "string"
          ? router.query.redirect_to
          : "/questions";
      router.replace(redirectTo);
    }
  }, [auth]);

  return (
    <>
      <Head>
        <title>PeerPrep: Login</title>
        <meta
          name="description"
          content="Question bank to ace your technical interviews"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginLayout>
          <LoginForm />
        </LoginLayout>
      </main>
    </>
  );
}

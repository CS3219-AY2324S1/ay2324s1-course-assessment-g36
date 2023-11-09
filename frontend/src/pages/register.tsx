import Head from "next/head";
import LoginLayout from "@/components/Layout/LoginLayout";
import RegistrationForm from "@/components/Users/Registration/RegistrationForm";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";

export default function Register() {
  const { state } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to questions page
  useEffect(() => {
    if (state === "authenticated") {
      router.push("/questions");
    }
  }, [state]);

  return (
    <>
      <Head>
        <title>PeerPrep: Registration</title>
        <meta
          name="description"
          content="Question bank to ace your technical interviews"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginLayout>
          <RegistrationForm />
        </LoginLayout>
      </main>
    </>
  );
}

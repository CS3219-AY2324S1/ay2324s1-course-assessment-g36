import Head from "next/head";
import RegistrationForm from "@/components/Users/Registration/RegistrationForm";
import UnauthLayout from "@/components/Layout/UnauthLayout";

export default function Register() {
  return (
    <>
      <Head>
        <title>PeerPrep: Registration</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <UnauthLayout>
          <RegistrationForm />
        </UnauthLayout>
      </main>
    </>
  );
}

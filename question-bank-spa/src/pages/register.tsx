import Head from 'next/head'
import Layout from '@/components/Layout/Layout'
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm'

export default function Registration() {
  return (
    <>
      <Head>
        <title>PeerPrep Question Bank: Registration</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          {/* <TestApi /> */}
          <RegistrationForm />
        </Layout>
      </main>
    </>
  )
}

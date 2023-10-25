import Head from 'next/head'
import LoginForm from '@/components/Users/Login/LoginForm'
import LoginLayout from '@/components/Layout/LoginLayout'

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
        <LoginLayout>
          <LoginForm />
        </LoginLayout>
      </main>
    </>
  )
}

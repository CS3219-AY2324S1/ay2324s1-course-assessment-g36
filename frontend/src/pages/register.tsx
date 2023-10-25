import Head from 'next/head'
import LoginLayout from '@/components/Layout/LoginLayout'
import RegistrationForm from '@/components/Users/Registration/RegistrationForm'
import { useEffect } from 'react'
import { useLocalStorage } from '@/utils/hooks'
import { useRouter } from 'next/router'

export default function Register() {
  const [token, _setToken] = useLocalStorage('token', '')
  const router = useRouter()
  useEffect(() => {
    // redirect authenticated users to questions page
    if (!!token) {
      router.push('/questions')
    }
  })
  return (
    <>
      <Head>
        <title>PeerPrep: Registration</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginLayout>
          <RegistrationForm />
        </LoginLayout>
      </main>
    </>
  )
}

import { useEffect } from 'react'
import { useLocalStorage } from '@/utils/hooks'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  const [token, _setToken] = useLocalStorage('token', '')

  useEffect(() => {
    if (token) {
      router.replace('/questions')
    } else {
      router.replace('/login')
    }
  })
  return <></>
}

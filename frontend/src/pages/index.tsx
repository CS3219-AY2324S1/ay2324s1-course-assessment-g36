import { useEffect } from "react"
import { useReadLocalStorage } from "usehooks-ts"
import { useRouter } from "next/router"

export default function Index() {
  const token = useReadLocalStorage<string>("token")
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.replace("/questions")
    } else {
      router.replace("/login")
    }
  })
  return <></>
}

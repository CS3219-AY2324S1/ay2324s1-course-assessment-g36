import { useEffect } from "react"
import { useReadLocalStorage } from "usehooks-ts"
import { useRouter } from "next/router"

// Only use this when we want to make requests
// It will automatically redirect to login page if token is not present
export function useJwt(): string {
  const token = useReadLocalStorage<string>("token") ?? ""
  const router = useRouter()
  useEffect(() => {
    if (!token) {
      router.push("/")
    }
  })
  return token
}

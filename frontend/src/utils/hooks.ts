import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth";

export function useRedirectUnauthenticatedUser() {
  const router = useRouter();
  const authState = useAuth();

  useEffect(() => {
    if (authState.state === "unauthenticated") {
      router.replace("/login");
    }
  }, [authState]);

  return {
    isLoading: authState.state === "uninitialized",
  };
}

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./auth";

export function useRedirectUnauthenticatedUser() {
  const router = useRouter();
  const authState = useAuth();

  useEffect(() => {
    if (authState.state === "unauthenticated") {
      const queryParams = new URLSearchParams();
      queryParams.append("redirect_to", router.asPath);
      router.replace(`/login?${queryParams.toString()}`);
    }
  }, [authState]);

  return {
    isLoading: authState.state === "uninitialized",
  };
}

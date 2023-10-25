import { useCallback, useEffect } from "react";

import { useRouter } from "next/router";
import { useToken } from "@/utils/auth";

const UNPROTECTED_ROUTES = ["/", "/register"];

interface IOwnProps {
  children: JSX.Element | JSX.Element[];
}

export default function RouteGuard({ children }: IOwnProps) {
  const router = useRouter();
  const token = useToken();

  const authCheck = useCallback(
    (pathname: string) => {
      const isProtectedRoute = !UNPROTECTED_ROUTES.includes(pathname);
      if (isProtectedRoute && !token) {
        router.push("/login");
      }
    },
    [router, token]
  );

  useEffect(() => {
    authCheck(router.pathname);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [authCheck, router.events, router.pathname]);

  return children;
}

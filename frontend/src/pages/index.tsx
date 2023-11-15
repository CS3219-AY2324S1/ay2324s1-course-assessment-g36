import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";

export default function Index() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state === "authenticated") {
      router.replace("/questions");
    } else if (state === "unauthenticated") {
      router.replace("/login");
    }
  }, [state]);

  return <></>;
}

import { useEffect, useState } from "react";

import { useReadLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";

const jwt = require("jsonwebtoken");

// Only use this when we want to make requests
// It will automatically redirect to login page if token is not present
export function useJwt(): string {
  const token = useReadLocalStorage<string>("token") ?? "";
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  });
  return token;
}

export function useIsAdmin(): boolean {
  const token = useJwt();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    try {
      setIsAdmin(jwt.decode(token).isAdmin);
    } catch {
      // token might not be present
      // we will return the default value `false`
    }
  }, [token]);
  return isAdmin;
}

export function useUsername(): string {
  const token = useJwt();
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    try {
      setUsername(jwt.decode(token).username);
    } catch {
      // token might not be present
      // we will return the default value ""
    }
  }, [token]);
  return username;
}

export function useUserId(): number {
  const token = useJwt();
  const [userId, setUserId] = useState<number>(0);
  useEffect(() => {
    try {
      setUserId(jwt.decode(token).userId);
    } catch {
      // token might not be present
      // we will return the default value 0
    }
  }, [token]);
  return userId;
}
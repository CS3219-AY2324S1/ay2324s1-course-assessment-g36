import { createContext, useContext, useEffect, useState } from "react";
import { decode } from "jsonwebtoken";

type User = {
  userId: number;
  username: string;
  isAdmin: boolean;
};

type AuthState =
  | { state: "uninitialized"; token: null; user: null }
  | { state: "unauthenticated"; token: null; user: null }
  | { state: "authenticated"; token: string; user: User };

const AuthContext = createContext({
  state: { state: "uninitialized" } as AuthState,
});

export function AuthProvider(props: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    state: "uninitialized",
    token: null,
    user: null,
  });

  useEffect(() => {
    let user: User | null = null;
    try {
      const token = localStorage.getItem("token");
      if (token) {
        user = decode(token) as User;
        setAuthState({ state: "authenticated" as const, token, user });
      } else {
        throw new Error("Could not read token from local storage");
      }
    } catch (err) {
      setAuthState({ state: "unauthenticated", token: null, user: null });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state: authState }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);

  return authContext.state;
}

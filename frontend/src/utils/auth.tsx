import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { decode } from "jsonwebtoken";

type User = {
  userId: number;
  username: string;
  isAdmin: boolean;
};

type AuthState =
  | { state: "uninitialized"; token: string; user: null }
  | { state: "unauthenticated"; token: string; user: null }
  | { state: "authenticated"; token: string; user: User };

const AuthContext = createContext({
  state: { state: "uninitialized" } as AuthState,
  setToken: (_token: string) => {},
});

export function AuthProvider(props: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    state: "uninitialized",
    token: "",
    user: null,
  });

  const setToken = useCallback((token: string) => {
    if (token === "") {
      setAuthState({
        state: "unauthenticated",
        token: "",
        user: null,
      });
      localStorage.removeItem("token");
      return;
    }

    try {
      const user = decode(token) as User;
      setAuthState({ state: "authenticated" as const, token, user });
      localStorage.setItem("token", token);
    } catch (err) {}
  }, []);

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
      console.error(err);
      setAuthState({ state: "unauthenticated", token: "", user: null });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state: authState, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  const { state: authState, setToken } = authContext;
  const { state, user, token } = authState;

  return useMemo(
    () => ({
      state,
      user,
      token,
      setToken,
    }),
    [setToken, state, token, user],
  );
}

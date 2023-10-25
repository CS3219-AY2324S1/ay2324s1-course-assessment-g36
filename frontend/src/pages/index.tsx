import Login from "./login";
import Questions from "./questions";
import { useRouter } from "next/router";
import { useToken } from "@/utils/auth";

export default function Home() {
  const token = useToken();
  return token ? <Questions /> : <Login />;
}

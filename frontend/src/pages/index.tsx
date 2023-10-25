import Login from "./login";
import Questions from "./questions";
import { useToken } from "@/utils/auth";

export default function Home() {
  const token = useToken();
  if (token) {
    window.location.href = "/questions";
  }
  return <Login />;
}

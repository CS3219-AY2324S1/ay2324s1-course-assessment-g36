import { Link } from "@chakra-ui/react";
import styles from "./UnauthLayout.module.css";
import { useRouter } from "next/router";

interface IOwnProps {
  children: JSX.Element | JSX.Element[];
}

export default function UnauthLayout({ children }: IOwnProps): JSX.Element {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <header className={styles.container_header}>
        <h3 className={styles.logo_title}>PeerPrep</h3>
      </header>
      {children}
    </div>
  );
}

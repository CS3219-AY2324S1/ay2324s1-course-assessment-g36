import Link from "next/link"
import styles from "./Header.module.css"

export default function Header(): JSX.Element {
  return (
    <header className={styles.container_header}>
      <Link href="/">
        <h3 className={styles.logo_title}>PeerPrep Question Bank</h3>
      </Link>
      <nav className={styles.nav_links}>
        <Link href='#' className={styles.nav_link}>Practice for interviews</Link>
      </nav>
    </header>
  )
}
import Link from "next/link"
import styles from "./Header.module.css"

export default function Header(): JSX.Element {
  return (
    <header className={styles.container_header}>
      <h3 className={styles.logo_title}>PeerPrep Question Bank</h3>
      <nav className={styles.nav_links}>
        <Link href='#' className={styles.nav_link}>Find a coding partner</Link>
        <Link href='#' className={styles.nav_link}>About</Link>
      </nav>
    </header>
  )
}
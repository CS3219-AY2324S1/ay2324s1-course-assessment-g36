import Link from "next/link"
import styles from "./Header.module.css"

export default function Header(): JSX.Element {
  return (
    <header className={styles.container_header}>
      <h3>Peerprep Question Bank</h3>
      <nav className={styles.nav_links}>
        <Link href='#' className={styles.nav_link}>About</Link>
        <Link href='#' className={styles.nav_link}>Blog</Link>
      </nav>
    </header>
  )
}
import Link from "next/link"
import { useRouter } from "next/router";
import styles from "./Header.module.css"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Header(): JSX.Element {

  const router = useRouter()

  return (
    <header className={styles.container_header}>

      <Link href="/">
        <h3 className={styles.logo_title}>PeerPrep</h3>
      </Link>

      {/* Desktop navbar */}
      <nav className={styles.nav_links}>
        <Link href='/register' className={styles.nav_link}>Register</Link>
        <Link href='/' className={styles.nav_link}>Questions</Link>
        <Link href='/profiles' className={styles.nav_link}>View Profiles</Link>
        <Link href='/room' className={styles.nav_link}>Practice for interviews</Link>
      </nav>

      {/* Mobile navbar */}
      <div className={`${styles.hidden}`}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={() => router.push("/register")}>Register</MenuItem>
            <MenuItem onClick={() => router.push("/")}>Questions</MenuItem>
            <MenuItem onClick={() => router.push("/profiles")}>View Profiles</MenuItem>
            <MenuItem onClick={() => router.push("/room")}>Practice for interviews</MenuItem>
          </MenuList>
        </Menu>
      </div>

    </header>
  )
}
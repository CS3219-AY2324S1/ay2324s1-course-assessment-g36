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

const PATH_HOME = '/'
const PATH_REGISTER = '/register'
const PATH_PROFILES = '/profiles'
const PATH_MATCH = '/match'

export default function Header(): JSX.Element {

  const router = useRouter()

  return (
    <header className={styles.container_header}>

      <Link href="/">
        <h3 className={styles.logo_title}>PeerPrep</h3>
      </Link>

      {/* Desktop navbar */}
      <nav className={styles.nav_links}>
        <Link href={PATH_REGISTER} className={styles.nav_link}>Register</Link>
        <Link href={PATH_HOME} className={styles.nav_link}>Questions</Link>
        <Link href={PATH_PROFILES} className={styles.nav_link}>View Profiles</Link>
        <Link href={PATH_MATCH} className={styles.nav_link}>Practice with a peer</Link>
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
            <MenuItem onClick={() => router.push(PATH_REGISTER)}>Register</MenuItem>
            <MenuItem onClick={() => router.push(PATH_HOME)}>Questions</MenuItem>
            <MenuItem onClick={() => router.push(PATH_REGISTER)}>View Profiles</MenuItem>
            <MenuItem onClick={() => router.push(PATH_MATCH)}>Practice with a peer</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  )
}
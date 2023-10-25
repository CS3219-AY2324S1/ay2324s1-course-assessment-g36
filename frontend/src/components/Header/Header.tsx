import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"

import { HamburgerIcon } from "@chakra-ui/icons"
import Link from "next/link"
import styles from "./Header.module.css"
import { useRouter } from "next/router"

const PATH_QUESTIONS = "/questions"
const PATH_PROFILES = "/profiles"
const PATH_MATCH = "/match"

export default function Header(): JSX.Element {
  const router = useRouter()

  return (
    <header className={styles.container_header}>
      <Link href="/questions">
        <h3 className={styles.logo_title}>PeerPrep</h3>
      </Link>

      {/* Desktop navbar */}
      <nav className={styles.nav_links}>
        <Link href={PATH_QUESTIONS} className={styles.nav_link}>
          Questions
        </Link>
        <Link href={PATH_PROFILES} className={styles.nav_link}>
          View Profiles
        </Link>
        <Link href={PATH_MATCH} className={styles.nav_link}>
          Practice with a peer
        </Link>
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
            <MenuItem onClick={() => router.push(PATH_QUESTIONS)}>Questions</MenuItem>
            <MenuItem onClick={() => router.push(PATH_PROFILES)}>View Profiles</MenuItem>
            <MenuItem onClick={() => router.push(PATH_MATCH)}>Practice with a peer</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  )
}

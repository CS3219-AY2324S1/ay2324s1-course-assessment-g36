import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { logoutUser } from "@/utils/auth";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

export default function Header(): JSX.Element {
  const router = useRouter();

  return (
    <header className={styles.container_header}>
      <Link href="/">
        <h3 className={styles.logo_title}>PeerPrep</h3>
      </Link>

      {/* Desktop navbar */}
      <nav className={styles.nav_links}>
        <Link href="/questions" className={styles.nav_link}>
          Questions
        </Link>
        <Link href="/profiles" className={styles.nav_link}>
          View Profiles
        </Link>
        <Link href="#" className={styles.nav_link}>
          Practice for interviews
        </Link>
        <Button onClick={logoutUser}>Logout</Button>
      </nav>

      {/* Mobile navbar */}
      <div className={`${styles.hidden}`}>
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
          <MenuList>
            <MenuItem onClick={() => router.push("/questions")}>Questions</MenuItem>
            <MenuItem onClick={() => router.push("/profiles")}>View Profiles</MenuItem>
            <MenuItem onClick={() => router.push("#")}>Practice for interviews</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
}

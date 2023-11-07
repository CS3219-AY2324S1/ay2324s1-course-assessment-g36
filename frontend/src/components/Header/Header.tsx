import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import styles from "./Header.module.css";
import { useIsAdmin, useUserId, useUsername } from "@/utils/hooks";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import AccountMenu from "./AccountMenu";

const PATH_QUESTIONS = "/questions";
const PATH_PROFILES = "/profiles";
const PATH_MATCH = "/match";
const PATH_HISTORY = "/history";
const PATH_MY_PROFILE = "/profile"

export default function Header(): JSX.Element {
  const router = useRouter();
  const [_token, setToken] = useLocalStorage("token", "");
  const isAdmin = useIsAdmin();
  const username = useUsername();
  const userId = useUserId();

  function handleSignOut() {
    setToken("");
  }

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
        {isAdmin && (
          <Link href={PATH_PROFILES} className={styles.nav_link}>
            View Profiles
          </Link>
        )}
        {!isAdmin && <Link href={PATH_MATCH} className={styles.nav_link}>
          Practice with a peer
        </Link>}
        <AccountMenu signOut={handleSignOut} isAdmin={isAdmin} username={username} userId={userId}/>
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
            {isAdmin && (
              <MenuItem onClick={() => router.push(PATH_PROFILES)}>View Profiles</MenuItem>
            )}
            {!isAdmin && (
            <MenuItem onClick={() => router.push(PATH_MATCH)}>Practice with a peer</MenuItem>
            )}
            {!isAdmin && (
            <MenuItem onClick={() => router.push(PATH_HISTORY)}>My History</MenuItem>
            )}
            <MenuItem onClick={() => router.push(PATH_MY_PROFILE + `/${userId}`)}>My Profile</MenuItem>
            <MenuItem
              onClick={() => {
                setToken("");
                router.push("/");
              }}
            >
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
}

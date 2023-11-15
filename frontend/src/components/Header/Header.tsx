import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import AccountMenu from "./AccountMenu";
import { useAuth } from "@/utils/auth";

const PATH_QUESTIONS = "/questions";
const PATH_PROFILES = "/profiles";
const PATH_MATCH = "/match";
const PATH_HISTORY = "/history";
const PATH_MY_PROFILE = "/profile";

export default function Header(): JSX.Element {
  const router = useRouter();
  const { user, setToken } = useAuth();
  const { username, userId, isAdmin = false } = user ?? {};

  function handleSignOut() {
    setToken("");
    router.push("/");
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
        {!isAdmin && (
          <Link href={PATH_MATCH} className={styles.nav_link}>
            Practice with a peer
          </Link>
        )}
        {typeof userId === "number" && typeof username === "string" && (
          <AccountMenu
            signOut={handleSignOut}
            isAdmin={isAdmin}
            username={username}
            userId={userId}
          />
        )}
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
            <Link href={PATH_QUESTIONS} passHref legacyBehavior>
              <MenuItem as="a">Questions</MenuItem>
            </Link>
            {isAdmin && (
              <Link href={PATH_PROFILES} passHref legacyBehavior>
                <MenuItem as="a">View Profiles</MenuItem>
              </Link>
            )}
            {!isAdmin && (
              <Link href={PATH_MATCH} passHref legacyBehavior>
                <MenuItem as="a">Practice with a peer</MenuItem>
              </Link>
            )}
            {typeof userId === "number" && !isAdmin && (
              <Link href={PATH_HISTORY} passHref legacyBehavior>
                <MenuItem as="a">My History</MenuItem>
              </Link>
            )}
            {typeof userId === "number" && !isAdmin && (
              <Link
                href={PATH_MY_PROFILE + `/${userId}`}
                passHref
                legacyBehavior
              >
                <MenuItem as="a">My Profile</MenuItem>
              </Link>
            )}
            <MenuItem onClick={handleSignOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
              >
                <path
                  fill="#000000b3"
                  d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
                />
              </svg>
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
}

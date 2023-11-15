import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";

interface IOwnProps {
  isAdmin: boolean;
  username: string;
  userId: number;
  signOut: () => void;
}

export default function AccountMenu({
  isAdmin,
  username,
  userId,
  signOut,
}: IOwnProps): JSX.Element {
  const PATH_PROFILE = `/profile/${userId}`;
  const PATH_HISTORY = "/history";

  return (
    <>
      <Menu placement="bottom-end">
        <MenuButton
          as={Avatar}
          transition="all 0.2s"
          _hover={{ bg: "gray.500" }}
          _expanded={{ bg: "blue.600" }}
          w="30px"
          h="30px"
        />
        <MenuList>
          <MenuGroup title={`Welcome, ${username}`}>
            {!isAdmin && (
              <Link href={PATH_HISTORY}>
                <MenuItem>My History</MenuItem>
              </Link>
            )}
            <Link href={PATH_PROFILE}>
              <MenuItem>My Profile</MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuItem onClick={signOut}>
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
    </>
  );
}

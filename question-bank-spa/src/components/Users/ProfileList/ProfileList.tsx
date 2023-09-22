import { useState, useEffect } from "react"
import { fetchAllUsers } from "@/utils/api"
import { User } from "@/interfaces";
import ProfileCard from "../ProfileCard/ProfileCard";
import { Stack, SimpleGrid, Heading } from "@chakra-ui/react";

export default function ProfileList(): JSX.Element {

  const [users, setUsers] = useState<User[]>([]);

  async function fetchData() {
    try {
      const results = await fetchAllUsers();
      setUsers(results);
    } catch (error) {
      console.log("Error fetching users;")
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Stack spacing='16px'>
        <Heading as='h2' size='lg' textAlign='center'>User Profiles</Heading>
        <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {users.map(user => <ProfileCard key={user.userId} user={user} />)}
        </SimpleGrid>
      </Stack>
    </>
  )
}
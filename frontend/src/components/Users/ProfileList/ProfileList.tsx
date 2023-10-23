import { useState, useEffect } from "react"
import { fetchAllUsers } from "@/utils/userApi"
import { User } from "@/interfaces";
import ProfileCard from "../ProfileCard/ProfileCard";
import { Stack, SimpleGrid, Heading, Text } from "@chakra-ui/react";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";
import { Status } from "@/enums";

export default function ProfileList(): JSX.Element {

  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>(Status.Loading);
  const [error, setError] = useState<string>("")

  async function fetchData() {

    try {
      const results = await fetchAllUsers();
      setUsers(results)
      setStatus(Status.Success)
    } catch (error: any) {
      setError(error.message)
      setStatus(Status.Error)
    }

  }

  useEffect(() => {
    fetchData();
  }, []);

  if (status === Status.Loading) {
    return <SkeletonLoader />
  }

  if (status === Status.Error) {
    return <Text color='red'>{ error }</Text>
  }

  return (
      <Stack spacing='16px'>
        <Heading as='h2' size='lg' textAlign='center'>User Profiles</Heading>
        <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {users.map(user => <ProfileCard key={user.userId} user={user} />)}
        </SimpleGrid>
      </Stack>
  )

}
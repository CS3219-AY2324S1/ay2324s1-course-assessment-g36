import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";

import Link from "next/link";
import { User } from "@/interfaces";

interface IOwnProps {
  user: User;
}

export default function ProfileCard({ user }: IOwnProps): JSX.Element {
  return (
    <Card variant="filled">
      <CardHeader>
        <Heading size="md">{user.username}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{user.email}</Text>
      </CardBody>
      <CardFooter>
        <Button variant="link" colorScheme="blue">
          <Link href={`/profile/${user.userId}`}>View here</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

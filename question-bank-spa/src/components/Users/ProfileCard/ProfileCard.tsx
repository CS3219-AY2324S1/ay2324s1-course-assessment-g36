import { User } from "@/interfaces"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'

interface IOwnProps {
  user: User
}

export default function ProfileCard({ user }: IOwnProps): JSX.Element {

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{user.username}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{user.email}</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
    </Card>
  )
}
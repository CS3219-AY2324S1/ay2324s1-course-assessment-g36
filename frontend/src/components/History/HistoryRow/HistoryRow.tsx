import {
    Tr,
    Td,
    Button,
  } from '@chakra-ui/react'
  import { Attempt } from '@/interfaces'
  import HistoryTitle from '../HistoryTitle/HistoryTitle'
  import HistoryDate from '../HistoryDate/HistoryDate'
  
  interface IOwnProps {
    attempt: Attempt
    deleteAttempt: (id: number) => void
  }
  
  export default function HistoryRow({ attempt, deleteAttempt }: IOwnProps): JSX.Element {
    return (
      <Tr>
        <Td><HistoryTitle attempt={attempt}/></Td>
        <Td><HistoryDate date={attempt.date}/></Td>
        <Td><Button size="xs" colorScheme="red" onClick={() => deleteAttempt(attempt.id)}>X</Button></Td>
      </Tr>
    )
  }
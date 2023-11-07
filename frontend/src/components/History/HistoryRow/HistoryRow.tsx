import {
    Tr,
    Td,
    Button,
    Tooltip,
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
        <Tooltip hasArrow label="Discard attempt" placement="left" aria-label="A tooltip to discard attempt record">
          <Td><Button size="xs" colorScheme="red" onClick={() => deleteAttempt(attempt.id)}>X</Button></Td>
        </Tooltip>
      </Tr>
    )
  }
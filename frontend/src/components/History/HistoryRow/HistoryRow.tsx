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
  }
  
  export default function HistoryRow({ attempt }: IOwnProps): JSX.Element {
    return (
      <Tr>
        <Td><HistoryTitle attempt={attempt}/></Td>
        <Td><HistoryDate date={attempt.date}/></Td>
      </Tr>
    )
  }
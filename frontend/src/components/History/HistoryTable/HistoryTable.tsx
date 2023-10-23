import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react'
import { Attempt } from '@/interfaces';
import styles from "./HistoryTable.module.css"
import SkeletonLoader from '@/components/Loader/SkeletonLoader';
import { deleteHistory } from '@/utils/historyApi';
import HistoryRow from '../HistoryRow/HistoryRow';

interface IOwnProps {
    history: Attempt[],
}

export default function HistoryTable({history}: IOwnProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [historyList, setHistoryList] = useState<Attempt[]>(history);

  async function deleteAttempt(attemptId: number) {
    try {
      await deleteHistory(attemptId);
      const filteredHistory = historyList.filter(attempt => attempt.id != attemptId);
      setHistoryList(filteredHistory)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setIsLoading(false)
  }, []);


  if (isLoading) {
    return <SkeletonLoader />
  }

  return <div className={styles.table_container}>
    <TableContainer>
      <Table variant='simple' colorScheme='gray' size='md'>
        <Thead>
          <Tr>
            <Th>question title</Th>
            <Th>date attempted</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            historyList.map(attempt => (
                <HistoryRow
                key={attempt.id}
                attempt={attempt}
                deleteAttempt={deleteAttempt}
                />
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  </div>
}
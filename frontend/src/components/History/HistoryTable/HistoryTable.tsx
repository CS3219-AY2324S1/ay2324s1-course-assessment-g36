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
import { fetchAllHistoryByUser } from '@/utils/historyApi';
import HistoryRow from '../HistoryRow/HistoryRow';

interface IOwnProps {
    history: Attempt[]
}

export default function HistoryTable({history}: IOwnProps): JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          </Tr>
        </Thead>
        <Tbody>
          {
            history.map(attempt => (
                <HistoryRow
                key={attempt.id}
                attempt={attempt}
                // deleteQuestion={removeQuestion}
              />
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  </div>
}
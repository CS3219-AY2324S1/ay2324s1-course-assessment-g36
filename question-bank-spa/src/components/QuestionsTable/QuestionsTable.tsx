import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Stack,
  Skeleton
} from '@chakra-ui/react'
import QuestionRow from '../QuestionRow/QuestionRow'
import { QuestionObject } from '@/data/interface';
import styles from "./QuestionsTable.module.css"
import { populateToLocalStorage, fetchQuestionsFromLocalStorage } from '@/utils/populateQuestions';

export default function QuestionsTable(): JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionObject[]>([])

  useEffect(() => {

    populateToLocalStorage();
    setQuestions(fetchQuestionsFromLocalStorage())
    setIsLoading(false)

  }, []);

  if (isLoading) {
    return <Stack>
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
      <Skeleton height='40px' />
    </Stack>
  }

  return <div className={styles.table_container}>
    <TableContainer>
      <Table variant='simple' colorScheme='gray' size='md'>
        <Thead>
          <Tr>
            <Th>title</Th>
            <Th>complexity</Th>
            <Th>category</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            questions.map(question => 
              <QuestionRow 
                key={question.id} 
                title={question.title} 
                categories={question.categories} 
                complexity={question.complexity} 
                description={question.description} 
                link={question.link}
              />)
          }
        </Tbody>
      </Table>
    </TableContainer>
  </div>
}
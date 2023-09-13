import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react'
import { Stack, Skeleton } from '@chakra-ui/react'
import QuestionRow from '../QuestionRow/QuestionRow'
import { QuestionObject } from '@/data/interface';
import { useState, useEffect } from 'react';
import styles from "./QuestionsTable.module.css"
import { populateToLocalStorage } from '@/utils/populateQuestions';

export default function QuestionsTable(): JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionObject[]>([])

  useEffect(() => {

    populateToLocalStorage();

    const questions: QuestionObject[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Check if the key corresponds to a question
      if (key && key.startsWith("question_")) {
        const jsonString = localStorage.getItem(key);

        if (jsonString) {
          const question: QuestionObject = JSON.parse(jsonString);
          questions.push(question);
        }
      }
    }

    questions.sort((a, b) => a.id - b.id);

    setQuestions(questions)
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
              <QuestionRow title={question.title} categories={question.categories} complexity={question.complexity} />)
          }
        </Tbody>
      </Table>
    </TableContainer>
  </div>
}
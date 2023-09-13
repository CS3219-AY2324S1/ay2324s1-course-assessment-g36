import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Stack,
  Skeleton,
  Button
} from '@chakra-ui/react'
import QuestionRow from '../QuestionRow/QuestionRow'
import { QuestionObject } from '@/data/interface';
import styles from "./QuestionsTable.module.css"
import { populateToLocalStorage, fetchQuestionsFromLocalStorage } from '@/utils/populateQuestions';
import QuestionForm from '../QuestionForm/QuestionForm';

export default function QuestionsTable(): JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionObject[]>([])

  useEffect(() => {
    populateToLocalStorage();
    setQuestions(fetchQuestionsFromLocalStorage())
    setIsLoading(false)
  }, []);

  function addQuestion(newQuestion: QuestionObject) {
    setQuestions([...questions, newQuestion])
  }

  function deleteQuestion(questionTitle: string) {
    const questionKey = `question_${questionTitle}`
    if (!localStorage.getItem(questionKey)) return
    localStorage.removeItem(questionKey)
    const filteredQuestions = questions.filter(question => question.title != questionTitle);
    setQuestions(filteredQuestions)
  }

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
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            questions.map(question =>
              <QuestionRow
                question={question}
                deleteQuestion={deleteQuestion}
              />)
          }
        </Tbody>
      </Table>
    </TableContainer>
    <br />
    <Button>+ Create Question</Button>
    <QuestionForm />
    <br />
  </div>
}
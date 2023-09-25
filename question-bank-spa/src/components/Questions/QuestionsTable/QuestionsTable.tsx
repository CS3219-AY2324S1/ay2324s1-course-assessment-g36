import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react'
import QuestionRow from '../QuestionRow/QuestionRow'
import { QuestionObject } from '@/data/interface';
import styles from "./QuestionsTable.module.css"
import { fetchAllQuestions, addQuestion, fetchQuestion, deleteQuestion } from '@/utils/questionApi';
import AddQuestion from '../QuestionForm/AddQuestion';
import SkeletonLoader from '@/components/Loader/SkeletonLoader';

export default function QuestionsTable(): JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionObject[]>([])

  useEffect(() => {
    fetchData()
    setIsLoading(false)
  }, []);

  async function fetchData() {
    try {
      const results = await fetchAllQuestions();
      setQuestions(results);
    } catch (error) {
      console.log("Error fetching users")
    }
  }

  async function createQuestion(newQuestion: QuestionObject) {
    try {
      await addQuestion(newQuestion);
      setQuestions([...questions, newQuestion])
    } catch (err) {
      console.log(err);
    }
  }

  async function removeQuestion(questionTitle: string) {
    try {
      await deleteQuestion(questionTitle);
      const filteredQuestions = questions.filter(question => question.title != questionTitle);
      setQuestions(filteredQuestions)
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <SkeletonLoader />
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
                key={question.id}
                question={question}
                deleteQuestion={removeQuestion}
              />)
          }
        </Tbody>
      </Table>
    </TableContainer>
    <br />

    <AddQuestion addQuestion={createQuestion} />

  </div>
}
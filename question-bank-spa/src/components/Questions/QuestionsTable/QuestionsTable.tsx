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
import { populateInitialQuestionsToLocalStorage, fetchQuestionsFromLocalStorage } from '@/utils/populateQuestions';
import AddQuestion from '../QuestionForm/AddQuestion';
import SkeletonLoader from '@/components/Loader/SkeletonLoader';

export default function QuestionsTable(): JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionObject[]>([])

  useEffect(() => {
    populateInitialQuestionsToLocalStorage();
    setQuestions(fetchQuestionsFromLocalStorage())
    setIsLoading(false)
  }, []);

  function addQuestion(newQuestion: QuestionObject) {
    localStorage.setItem(`question_${newQuestion.title}`, JSON.stringify(newQuestion))
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
                deleteQuestion={deleteQuestion}
              />)
          }
        </Tbody>
      </Table>
    </TableContainer>
    <br />

    <AddQuestion addQuestion={addQuestion} />

  </div>
}
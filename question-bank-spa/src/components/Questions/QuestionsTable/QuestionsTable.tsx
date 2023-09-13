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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import QuestionRow from '../QuestionRow/QuestionRow'
import { QuestionObject } from '@/data/interface';
import styles from "./QuestionsTable.module.css"
import { populateInitialQuestionsToLocalStorage, fetchQuestionsFromLocalStorage } from '@/utils/populateQuestions';
import QuestionForm from '../QuestionForm/QuestionForm';

export default function QuestionsTable(): JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionObject[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    populateInitialQuestionsToLocalStorage();
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

    <Button onClick={onOpen}>+ Create Question</Button>
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a new question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QuestionForm />
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
  </div>
}
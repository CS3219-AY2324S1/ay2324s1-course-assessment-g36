import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { addQuestion, deleteQuestion, fetchAllQuestions } from "@/utils/questionApi"
import { useCallback, useEffect, useState } from "react"

import AddQuestion from "../QuestionForm/AddQuestion"
import { QuestionObject } from "@/interfaces"
import QuestionRow from "../QuestionRow/QuestionRow"
import SkeletonLoader from "@/components/Loader/SkeletonLoader"
import styles from "./QuestionsTable.module.css"
import { useJwt } from "@/utils/hooks"

export default function QuestionsTable(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [questions, setQuestions] = useState<QuestionObject[]>([])
  const token = useJwt()

  const fetchData = useCallback(async () => {
    try {
      const results = await fetchAllQuestions(token)
      setQuestions(results)
    } catch (error) {
      console.log("Error fetching questions")
    }
  }, [token])

  useEffect(() => {
    fetchData()
    setIsLoading(false)
  }, [fetchData])

  async function createQuestion(newQuestion: QuestionObject) {
    try {
      await addQuestion(newQuestion, token)
      setQuestions([...questions, newQuestion])
    } catch (err) {
      console.log(err)
    }
  }

  async function removeQuestion(questionTitle: string) {
    try {
      await deleteQuestion(questionTitle, token)
      const filteredQuestions = questions.filter((question) => question.title != questionTitle)
      setQuestions(filteredQuestions)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <div className={styles.table_container}>
      <TableContainer>
        <Table variant="simple" colorScheme="gray" size="md">
          <Thead>
            <Tr>
              <Th>title</Th>
              <Th>complexity</Th>
              <Th>category</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {questions.map((question) => (
              <QuestionRow key={question.id} question={question} deleteQuestion={removeQuestion} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <br />

      <AddQuestion addQuestion={createQuestion} />
    </div>
  )
}

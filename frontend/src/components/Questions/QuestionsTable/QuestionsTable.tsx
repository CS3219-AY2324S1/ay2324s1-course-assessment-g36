import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import QuestionRow from "../QuestionRow/QuestionRow";
import { QuestionObject } from "@/interfaces";
import styles from "./QuestionsTable.module.css";
import {
  fetchAllQuestions,
  addQuestion,
  deleteQuestion,
} from "@/services/questions";
import AddQuestion from "../QuestionForm/AddQuestion";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";
import { useIsAdmin, useJwt } from "@/utils/hooks";

export default function QuestionsTable(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionObject[]>([]);
  const token = useJwt();
  const isAdmin = useIsAdmin();

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  async function fetchData() {
    try {
      const results = await fetchAllQuestions();
      setQuestions(results);
    } catch (error) {
      console.log("Error fetching questions");
    }
  }

  async function createQuestion(newQuestion: QuestionObject) {
    try {
      await addQuestion(newQuestion, token);
      setQuestions([...questions, newQuestion]);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeQuestion(questionId: number) {
    try {
      await deleteQuestion(questionId, token);
      const filteredQuestions = questions.filter(
        (question) => question.id != questionId,
      );
      setQuestions(filteredQuestions);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return <SkeletonLoader />;
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
              <QuestionRow
                key={question.id}
                question={question}
                deleteQuestion={removeQuestion}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <br />

      {isAdmin && <AddQuestion addQuestion={createQuestion} />}
    </div>
  );
}

import styles from "./QuestionTitle.module.css"
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import QuestionDetail from "../QuestionDetails/QuestionDetail"
import { QuestionObject } from "@/interfaces"

interface IOwnProps {
  question: QuestionObject
}

export default function QuestionTitle({ question }: IOwnProps): JSX.Element {

  function truncateTitle(): string {
    if (question.title.length > 35) {
      return question.title.slice(0, 35) + '...'
    }
    return question.title
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Tooltip hasArrow label="View question details" placement="left" aria-label="A tooltip to view question details">
        <span className={styles.question_title} onClick={onOpen}>{truncateTitle()}</span>
      </Tooltip>
      <QuestionDetail question={question} isOpen={isOpen} onClose={onClose}/>
    </>
  )
}
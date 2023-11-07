import styles from "./QuestionTitle.module.css"
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import QuestionDetail from "../QuestionDetails/QuestionDetail"
import { QuestionObject } from "@/interfaces"
import { truncateTitle } from "@/utils/formats"

interface IOwnProps {
  question: QuestionObject
}

export default function QuestionTitle({ question }: IOwnProps): JSX.Element {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Tooltip hasArrow label="View question details" placement="left" aria-label="A tooltip to view question details">
        <span className={styles.question_title} onClick={onOpen}>{truncateTitle(question.title)}</span>
      </Tooltip>
      <QuestionDetail question={question} isOpen={isOpen} onClose={onClose}/>
    </>
  )
}
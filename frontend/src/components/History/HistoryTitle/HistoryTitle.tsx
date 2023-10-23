import styles from "./HistoryTitle.module.css"
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import HistoryEditor from "../HistoryEditor/HistoryEditor"
import { Attempt } from "@/interfaces"

interface IOwnProps {
  attempt: Attempt
}

export default function HistoryTitle({ attempt }: IOwnProps): JSX.Element {

  function truncateTitle(): string {
    if (attempt.title.length > 35) {
      return attempt.title.slice(0, 35) + '...'
    }
    return attempt.title
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      <Tooltip hasArrow label="View attempt" placement="left" aria-label="A tooltip to view question details">
        <span className={styles.history_title} onClick={onOpen}>{truncateTitle()}</span>
      </Tooltip>
      <HistoryEditor attempt={attempt} isOpen={isOpen} onClose={onClose}/>
    </>
  )
}
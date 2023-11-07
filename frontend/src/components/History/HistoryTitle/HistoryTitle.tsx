import styles from "./HistoryTitle.module.css"
import { Tooltip, useDisclosure } from '@chakra-ui/react'
import HistoryEditor from "../HistoryEditor/HistoryEditor"
import { Attempt } from "@/interfaces"
import { truncateTitle } from "@/utils/formats"

interface IOwnProps {
  attempt: Attempt
}

export default function HistoryTitle({ attempt }: IOwnProps): JSX.Element {

  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      <Tooltip hasArrow label="View attempt" placement="left" aria-label="A tooltip to view question details">
        <span className={styles.history_title} onClick={onOpen}>{truncateTitle(attempt.title)}</span>
      </Tooltip>
      <HistoryEditor attempt={attempt} isOpen={isOpen} onClose={onClose}/>
    </>
  )
}
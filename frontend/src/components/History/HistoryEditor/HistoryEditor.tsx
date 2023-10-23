import { createHistory } from "@/utils/historyApi"
import styles from "./HistoryEditor.module.css"
import { Attempt } from "@/interfaces"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useToast
} from '@chakra-ui/react'
import Link from "next/link"
import { useState } from "react"

interface IOwnProps {
  attempt: Attempt
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryEditor({ attempt, isOpen, onClose }: IOwnProps): JSX.Element {

  const [updatedAttempt, setUpdatedAttempt] = useState<Attempt>(attempt);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedAttempt((prevAttempt) => ({
        ...prevAttempt,
        attempt: e.target.value,
      }));
  };

  async function updateAttempt() {
    try {
        await createHistory(updatedAttempt);
        toast({
            position: 'top',
            title: 'Attempt updated',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
    } catch (error : any) {
        toast({
            position: 'top',
            title: `${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
         {attempt.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <div className={styles.date}>{attempt.date}</div>
            <div className={styles.bodyContainer}>
                <div className={styles.description}>
                    {attempt.description.split('\n').map(desc => <p>{desc}<br /></p>)}
                </div>
                <textarea 
                    className={styles.inputField}
                    value={updatedAttempt.attempt}
                    onChange={e => handleChange(e)}
                />
            </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={() => updateAttempt()}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
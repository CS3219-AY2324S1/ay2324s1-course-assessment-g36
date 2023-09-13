import styles from "./QuestionTitle.module.css"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import Link from "next/link"

interface IOwnProps {
  title: string
  description: string
  link: string
}

export default function QuestionTitle({ title, description, link }: IOwnProps): JSX.Element {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <span className={styles.question_title} onClick={onOpen}>{title}</span>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Question Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {description.split('\n').map(desc => <p key={desc}>{desc}<br/></p>)}
          </ModalBody>
          <ModalFooter>
            <Link href={link}><Button colorScheme="green">Check out here</Button></Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import QuestionForm from "./QuestionForm";
import { QuestionObject } from "@/interfaces";

interface IOwnProps {
  addQuestion: (newQuestion: QuestionObject) => void;
}

export default function AddQuestion({ addQuestion }: IOwnProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>+ Create Question</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit a new question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QuestionForm onModalClose={onClose} addQuestion={addQuestion} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

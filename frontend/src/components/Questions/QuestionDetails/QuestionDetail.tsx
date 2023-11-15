import { QuestionObject } from "@/interfaces";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import QuestionDescription from "../QuestionDescription/QuestionDescription";

interface IOwnProps {
  question: QuestionObject;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestionDetail({
  question,
  isOpen,
  onClose,
}: IOwnProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {question.id}. {question.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <QuestionDescription description={question.description} />
        </ModalBody>
        <ModalFooter>
          <Link href={question.link}>
            <Button colorScheme="green">Check out here</Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

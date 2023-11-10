import { updateHistory } from "@/services/history";
import styles from "./HistoryEditor.module.css";
import { Attempt } from "@/interfaces";
import { PROGRAMMING_LANGUAGES } from "@/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useToast,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "@/utils/auth";
import Link from "next/link";
import QuestionDescription from "@/components/Questions/QuestionDescription/QuestionDescription";

interface IOwnProps {
  attempt: Attempt;
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryEditor({
  attempt,
  isOpen,
  onClose,
}: IOwnProps): JSX.Element {
  const [updatedAttempt, setUpdatedAttempt] = useState<Attempt>(attempt);
  const toast = useToast();
  const { token } = useAuth();

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedAttempt((prevAttempt) => ({
      ...prevAttempt,
      attempt: e.target.value,
    }));
  };

  const handleLanguageChange = (e: string) => {
    if (e == attempt.language) {    // if language is the same as previously saved attempt, restore saved code
      setUpdatedAttempt((prevAttempt) => ({
        ...prevAttempt,
        language: e,
        attempt: attempt.attempt
      }))
    } else {
      setUpdatedAttempt((prevAttempt) => ({
        ...prevAttempt,
        language: e,
        attempt: "",
      }));
    }
  };

  async function updateAttempt() {
    try {
      if (updatedAttempt.attempt == "") {
        throw new Error("Attempt cannot be empty.")
      }
      const result = await updateHistory(updatedAttempt, token);
      toast({
        position: "top",
        title: "Attempt updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUpdatedAttempt((prevAttempt) => ({
        ...prevAttempt,
        date: result.date
      }))
    } catch (error: any) {
      toast({
        position: "top",
        title: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent className={styles.contentContainer}>
        <ModalHeader>{attempt.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.body}>
            <div className={styles.bodyContainer}>
              <div className={styles.detailsContainer}>
                <div className={styles.date}>{updatedAttempt.date}</div>
                <div className={styles.description}>
                  <QuestionDescription description={attempt.description}/>
                </div>
                <Link href={attempt.link}>
                  <Button colorScheme="gray" className={styles.checkout}>Check out here</Button>
                </Link>
            </div>
            
            <div className={styles.inputContainer}>
              <div className={styles.selectContainer}>
                <Tooltip
                  hasArrow
                  label="Unsaved changes may be lost upon switching languages!"
                  placement="right"
                  aria-label="A tooltip to warn about unsaved attempts"
                >
                <Select
                  variant={"flushed"}
                  size="xs"
                  value={updatedAttempt.language}
                  maxWidth="50%"
                  textUnderlineOffset="none"
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  {PROGRAMMING_LANGUAGES
                  .map((language) => {
                    const _key = Object.keys(language)[0];
                    return (
                      <option key={_key} value={_key}>
                        {_key}
                      </option>
                    );
                  })}
                </Select>
                </Tooltip>
              </div>
              <textarea
                className={styles.inputField}
                value={updatedAttempt.attempt}
                onChange={(e) => handleCodeChange(e)}
              />
            </div>
          </div> 
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={() => updateAttempt()}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

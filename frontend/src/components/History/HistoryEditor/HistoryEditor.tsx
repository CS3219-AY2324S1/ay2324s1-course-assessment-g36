import { createHistory, updateHistory } from "@/services/history";
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "@/utils/auth";
import Link from "next/link";

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
    setUpdatedAttempt((prevAttempt) => ({
      ...prevAttempt,
      language: e,
    }));
  };

  async function updateAttempt() {
    try {
      await updateHistory(updatedAttempt, token);
      toast({
        position: "top",
        title: "Attempt updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
                <div className={styles.date}>{attempt.date}</div>
                  <div className={styles.description}>
                    {attempt.description.split("\n").map((desc, index) => (
                      <p key={index}>
                        {desc}
                        <br />
                      </p>
                    ))}
                  </div>
                <Link href={attempt.link}>
                  <Button colorScheme="gray" className={styles.checkout}>Check out here</Button>
                </Link>
            </div>
            
            <div className={styles.inputContainer}>
              <div className={styles.selectContainer}>
                <Select
                  variant={"flushed"}
                  size="xs"
                  placeholder={attempt.language}
                  maxWidth="50%"
                  textUnderlineOffset="none"
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  {PROGRAMMING_LANGUAGES.filter(
                    (language) => Object.keys(language)[0] != attempt.language,
                  ).map((language) => {
                    const _key = Object.keys(language)[0];
                    return (
                      <option key={_key} value={_key}>
                        {_key}
                      </option>
                    );
                  })}
                </Select>
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

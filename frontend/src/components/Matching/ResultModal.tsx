import { MatchCriteria } from "@/interfaces";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useMatcher } from "./useMatcher";

interface IOwnProps {
  criteria: MatchCriteria;
  isModalOpen: boolean;
  onModalClose: () => void;
}

function redirectToCodeRoom(room_id: string, question_id: number): void {
  const queryParams = new URLSearchParams();

  queryParams.append("questionId", question_id.toString());

  const queryString = queryParams.toString();
  const redirectUrl = `/room/${room_id}?${queryString}`;
  window.location.href = redirectUrl;
}

export default function ResultModal({
  criteria,
  isModalOpen,
  onModalClose,
}: IOwnProps) {
  const matchState = useMatcher({ match: isModalOpen, criteria });

  // Redirect to code room after successful match.
  useEffect(() => {
    if (matchState.status === "matched") {
      redirectToCodeRoom(matchState.room_id, matchState.question_id);
    }
  }, [matchState]);

  return (
    <Modal
      isOpen={isModalOpen}
      closeOnOverlayClick={matchState.status !== "matching"}
      closeOnEsc={matchState.status !== "matching"}
      onClose={onModalClose}
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          {matchState.status === "matching" ? (
            <Text>{`Finding match in ${matchState.secondsRemaining}s...`}</Text>
          ) : matchState.status === "matched" ? (
            <Text>{`Matched with: ${matchState.username}`}</Text>
          ) : (
            <Text>Failed to find match</Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

import { MatchCriteria } from "@/interfaces";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SECOND, useMatcher } from "./useMatcher";

interface IOwnProps {
  criteria: MatchCriteria;
  isModalOpen: boolean;
  onModalClose: () => void;
}

function getCodeRoomUrl(room_id: string, question_id: number) {
  const queryParams = new URLSearchParams();
  queryParams.append("questionId", question_id.toString());

  const queryString = queryParams.toString();
  const redirectUrl = `/room/${room_id}?${queryString}`;

  return redirectUrl;
}

export default function ResultModal({
  criteria,
  isModalOpen,
  onModalClose,
}: IOwnProps) {
  const router = useRouter();
  const matchState = useMatcher({ match: isModalOpen, criteria });

  // Redirect to code room after successful match.
  useEffect(() => {
    if (matchState.status === "matched") {
      const codeRoomUrl = getCodeRoomUrl(
        matchState.room_id,
        matchState.question_id,
      );

      // Redirect after a specific timeout to allow the user to read the message.
      setTimeout(() => {
        router.push(codeRoomUrl);
      }, SECOND);
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

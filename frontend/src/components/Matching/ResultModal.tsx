import { MatchCriteria } from "@/interfaces";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
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
        <ModalHeader>Finding you a match!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack minH="200px" align="center" spacing="40px" paddingY="40px">
            {matchState.status === "matching" ? (
              <>
                <Spinner size="xl" />
                <Stack>
                  <Text align="center">
                    Finding match in {matchState.secondsRemaining}s...
                  </Text>
                  <Text align="center">
                    {/* TODO: Retry */}
                    <Button variant="link" colorScheme="red">
                      Cancel
                    </Button>
                  </Text>
                </Stack>
              </>
            ) : matchState.status === "matched" ? (
              <>
                <CheckCircleIcon boxSize={54} />
                <Text align="center">Matched with: {matchState.username}</Text>
              </>
            ) : (
              <>
                <CloseIcon boxSize={54} />
                <Stack>
                  <Text align="center">Failed to find match.</Text>
                  <Text align="center">
                    {/* TODO: Retry */}
                    <Button variant="link" colorScheme="teal">
                      Retry?
                    </Button>
                  </Text>
                </Stack>
              </>
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

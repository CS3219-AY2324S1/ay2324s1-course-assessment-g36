import { MAX_MATCH_WAIT_S } from "@/constants";
import { MatchCriteria } from "@/interfaces";
import { useAuth } from "@/utils/auth";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MATCHING_URI } from "../../services/api";

interface IOwnProps {
  criteria: MatchCriteria;
  isModalOpen: boolean;
  onModalClose: () => void;
}

const SECOND = 1000;

type MatchState =
  | { status: "not-matching" }
  | {
      status: "matching";
      secondsRemaining: number;
    }
  | {
      status: "matched";
      username: string;
      room_id: string;
      question_id: number;
    }
  | { status: "timed-out" };

function useMatcher() {
  const wsRef = useRef<WebSocket>();
  const [matchState, setMatchState] = useState<MatchState>({
    status: "not-matching",
  });
  const intervalIdRef = useRef<NodeJS.Timeout>();
  const { token } = useAuth();

  function match(criteria: MatchCriteria) {
    function cleanup() {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = undefined;
      }
      if (typeof intervalIdRef.current === "number") {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = undefined;
      }
    }

    if (!wsRef.current) {
      wsRef.current = new WebSocket(MATCHING_URI);
      wsRef.current.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        switch (message.status) {
          case "initialized":
            // No-op
            break;
          case "matched":
            setMatchState({
              status: "matched",
              username: message.username,
              room_id: message.room_id,
              question_id: message.question_id,
            });
            cleanup();
        }
      });
      // Update matching state once closed.
      wsRef.current.addEventListener("close", () => {
        setMatchState((matchState) => {
          if (matchState.status !== "matching") return matchState;
          return { status: "not-matching" };
        });
      });
      // Send initial matching request.
      wsRef.current.addEventListener("open", () => {
        wsRef.current?.send(
          JSON.stringify({
            type: "initialization",
            question_complexity: criteria.difficulty,
            token: token,
          }),
        );
      });
    }

    setMatchState({
      status: "matching",
      secondsRemaining: MAX_MATCH_WAIT_S,
    });

    intervalIdRef.current = setInterval(() => {
      setMatchState((matchState) => {
        if (matchState.status !== "matching") return matchState;

        return {
          ...matchState,
          secondsRemaining: Math.max(0, matchState.secondsRemaining - 1),
        };
      });
    }, SECOND);

    // Close connection after timeout period.
    const timeoutId = setTimeout(() => {
      cleanup();
    }, MAX_MATCH_WAIT_S * SECOND);

    return () => {
      cleanup();
      clearTimeout(timeoutId);
    };
  }

  return {
    matchState,
    match,
  };
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
  const { matchState, match } = useMatcher();

  // Begin matching once modal opens.
  useEffect(() => {
    const cleanup = isModalOpen ? match(criteria) : () => {};

    return cleanup;
  }, [isModalOpen]);

  if (matchState.status === "matched") {
    redirectToCodeRoom(matchState.room_id, matchState.question_id);
  }

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

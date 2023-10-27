import { MAX_MATCH_WAIT_S } from "@/constants";
import { MatchCriteria } from "@/interfaces"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from "react";

interface IOwnProps {
  criteria: MatchCriteria
  isModalOpen: boolean
  onModalClose: () => void
}

const SECOND = 1000

type MatchState =
  | { status: "not-matching" }
  | {
    status: "matching";
    secondsRemaining: number;
  }
  | {
    status: "matched";
    user_id: number;
    username: string;
    room_id: string;
  }
  | { status: "timed-out" };

function useMatcher({ userId }: { userId: number }) {
  const wsRef = useRef<WebSocket>();
  const [matchState, setMatchState] = useState<MatchState>({ status: "not-matching" });
  const intervalIdRef = useRef<NodeJS.Timeout>();

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
      wsRef.current = new WebSocket("ws://localhost:3002/");
      wsRef.current.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        switch (message.status) {
          case "initialized":
            // No-op
            break;
          case "matched":
            setMatchState(
              {
                status: "matched",
                user_id: message.user_id,
                username: `User ${message.user_id}`,
                room_id: message.room_id
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
        wsRef.current?.send(JSON.stringify({
          type: "initialization",
          question_complexity: criteria.difficulty,
          user_id: userId,
        }));
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

function redirectToCodeRoom(room_id: string, criteria: MatchCriteria): void {

  const queryParams = new URLSearchParams();

  for (const key in criteria) {
    if (criteria.hasOwnProperty(key)) {
      queryParams.append(key, criteria[key as keyof MatchCriteria]);
    }
  }

  const queryString = queryParams.toString()
  const redirectUrl = `/room/${room_id}?${queryString}`
  window.location.href = redirectUrl
}

export default function ResultModal({ criteria, isModalOpen, onModalClose }: IOwnProps) {
  // TODO: replace with current user ID.
  const [userId] = useState(() => Math.round(Math.random() * 1000));
  const { matchState, match } = useMatcher({ userId });

  // Begin matching once modal opens.
  useEffect(() => {
    const cleanup = isModalOpen ? match(criteria) : () => { };

    return cleanup;
  }, [isModalOpen]);

  if (matchState.status === "matched") {
    redirectToCodeRoom(matchState.room_id, criteria);
  }

  return <Modal isOpen={isModalOpen} closeOnOverlayClick={matchState.status !== "matching"} closeOnEsc={matchState.status !== "matching"} onClose={onModalClose} size="3xl" isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
        {matchState.status === "matching"
          ? <Text>{`Finding match in ${matchState.secondsRemaining}s...`}</Text>
          : matchState.status === "matched"
            ? <Text>{`Matched with: ${matchState.username}`}</Text>
            : <Text>Failed to find match</Text>
        }
      </ModalBody>
    </ModalContent>
  </Modal>
}

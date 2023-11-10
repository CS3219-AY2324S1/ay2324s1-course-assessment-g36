import { MAX_MATCH_WAIT_S } from "@/constants";
import { MatchCriteria } from "@/interfaces";
import { useAuth } from "@/utils/auth";
import { useEffect, useRef, useState } from "react";

export const SECOND = 1000;

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

type UseMatcherOptions = { match: boolean; criteria: MatchCriteria };

export function useMatcher({
  match: shouldMatch,
  criteria,
}: UseMatcherOptions) {
  const wsRef = useRef<WebSocket>();
  const [matchState, setMatchState] = useState<MatchState>({
    status: "not-matching",
  });
  const intervalIdRef = useRef<NodeJS.Timeout>();
  const { token } = useAuth();

  useEffect(() => {
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

    if (!shouldMatch) return;

    if (!wsRef.current) {
      wsRef.current = new WebSocket("ws://localhost:3002/");
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
  }, [token, shouldMatch, criteria]);

  return matchState;
}

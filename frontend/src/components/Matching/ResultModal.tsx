import { MAX_MATCH_WAIT_S } from "@/constants";
import { MatchCriteria } from "@/interfaces"
import { getMatch } from "@/utils/matchingApi";
import {
    Alert,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from "react";

interface IOwnProps {
  criteria: MatchCriteria
}

const SECOND = 1000

function useTimer(seconds: number) {
  const [timespan, setTimespan] = useState(seconds * SECOND);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan((_timespan) => _timespan - SECOND);
    }, SECOND);

    return () => {
      clearInterval(intervalId);
    };
  }, [SECOND]);

  return timespan / SECOND;
}

export default function ResultModal({criteria}: IOwnProps) {
    const seconds = useTimer(MAX_MATCH_WAIT_S)
    const [waiting, setWaiting] = useState<boolean>(true);
    const [expired, setExpired] = useState<boolean>(false);
    const [matchedUser, setMatchedUser] = useState<string>('');
    const hasResult = () => {
        return matchedUser != ''
    }
    const fetchMatch = async () => {
        const user = await getMatch(criteria)
        setWaiting(false)
        if (!expired) setMatchedUser(user.username)
    }
    const startCountdown = async () => {
        await new Promise(r => setTimeout(r, MAX_MATCH_WAIT_S * SECOND))
        setWaiting(false)
        if (!hasResult) setExpired(true)
    }
    useEffect(() => {
        fetchMatch()
        startCountdown()
    }, [])
    return <>
    {waiting
        ? <Text>{`Finding match in ${seconds}s...`}</Text>
        : expired
            ? <Text> Failed to find match </Text>
            : <Text> {`Matched with: ${matchedUser}`}</Text>
    }
    </>
}
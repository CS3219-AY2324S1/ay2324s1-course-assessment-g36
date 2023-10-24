import { MAX_MATCH_WAIT_S } from "@/constants";
import { MatchCriteria } from "@/interfaces"
import { getMatch } from "@/utils/matchingApi";
import {
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
    const [matchedUser, setMatchedUser] = useState<string>('');
    function hasResult() {
        return matchedUser != ''
    }
    const fetchMatch = async () => {
        const user = await getMatch(criteria)
        return user.username
    }
    const startCountdown = async () => {
        await new Promise(r => setTimeout(r, MAX_MATCH_WAIT_S * SECOND))
        return ''
    }
    const onRender = async () => {
        const username = await Promise.any([startCountdown(), fetchMatch()])
        console.log(username)
        setWaiting(false)
        setMatchedUser(username)
    }
    useEffect(() => {
        onRender()
    }, [])
    return <>
    {waiting
        ? <Text>{`Finding match in ${seconds}s...`}</Text>
        : hasResult()
            ? <Text> {`Matched with: ${matchedUser}`}</Text>
            : <Text> Failed to find match </Text> 
    }
    </>
}
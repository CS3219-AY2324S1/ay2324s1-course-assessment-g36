import { MAX_MATCH_WAIT_S } from "@/constants";
import { MatchCriteria } from "@/interfaces"
import { getMatch } from "@/utils/matchingApi";
import {
    Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from "react";

interface IOwnProps {
  criteria: MatchCriteria
  isModalOpen: boolean
  onModalClose: () => void
}

const SECOND = 1000

function useTimer(seconds: number, restart: boolean) {
  const [timespan, setTimespan] = useState(seconds * SECOND);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan((_timespan) => _timespan - SECOND);
    }, SECOND);

    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

    useEffect(() => {
        setTimespan(seconds * SECOND);
    }, [restart]);

  return timespan / SECOND;
}

export default function ResultModal({criteria, isModalOpen, onModalClose}: IOwnProps) {
    const [waiting, setWaiting] = useState<boolean>(true);
    const seconds = useTimer(MAX_MATCH_WAIT_S, waiting);
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
        setMatchedUser('')
        setWaiting(true)
        const username = await Promise.any([startCountdown(), fetchMatch()])
        console.log(username)
        setWaiting(false)
        setMatchedUser(username)
    }
    useEffect(() => {
        onRender()
    }, [criteria])
    return <Modal isOpen={isModalOpen} closeOnOverlayClick={!waiting} closeOnEsc={!waiting} onClose={onModalClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalBody>
                {waiting
                    ? <Text>{`Finding match in ${seconds}s...`}</Text>
                    : hasResult()
                        ? <Text> {`Matched with: ${matchedUser}`}</Text>
                        : <Text> Failed to find match </Text> 
                }
            </ModalBody>
        </ModalContent>
    </Modal>
}
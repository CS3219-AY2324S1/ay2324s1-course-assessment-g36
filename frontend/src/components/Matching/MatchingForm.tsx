import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  useDisclosure,
  RadioGroup,
  Radio,
  Center,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody
} from '@chakra-ui/react'
import styles from "./MatchingForm.module.css"
import { MatchCriteria, MatchResult } from '@/interfaces'
import { MAX_MATCH_WAIT_S } from '@/constants'
import { DIFFICULTY_LEVELS } from '@/types'
import { getMatch } from '@/utils/matchingApi'
import ResultModal from './ResultModal'

export default function MatchingForm(): JSX.Element {
  const [matchedUser, setMatchedUser] = useState<MatchResult>({
    user_id: -1,
    username: ''
  })
  const [criteria, setCriteria] = useState<MatchCriteria>({
    difficulty: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setCriteria({ ...criteria, [fieldName]: e.target.value })
  };

  const { isOpen, onOpen, onClose } = useDisclosure()


  function isDisabled(): boolean {
    return criteria.difficulty == ""
  }

  return (
    <>
    <Stack className={styles.form_container} spacing='20px'>
      <Heading as='h2' size='xl' textAlign='center'>Practice with a peer</Heading>
      <FormControl>
        <FormLabel size='l' className={styles.criteria} textAlign='center'>
          Question complexity
        </FormLabel>
        <Center>
          <RadioGroup>
              <Stack className={styles.option_container} direction='row'>
                {DIFFICULTY_LEVELS.map(level => 
                  <Radio className={styles.option} key={level} value={level} onChange={(e) => handleChange(e, "difficulty")}>{level}</Radio>
                )}
              </Stack>
          </RadioGroup>
        </Center>
      </FormControl>

      <Button onClick={onOpen} isDisabled={isDisabled()}>
        Match
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ResultModal criteria={criteria}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
    </>
  )
}


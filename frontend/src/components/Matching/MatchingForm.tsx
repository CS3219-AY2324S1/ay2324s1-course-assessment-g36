import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  useToast,
  RadioGroup,
  Radio,
  Center
} from '@chakra-ui/react'
import styles from "./MatchingForm.module.css"
import { MatchCriteria, MatchResult } from '@/interfaces'
import { MAX_MATCH_WAIT_S } from '@/constants'
import { DIFFICULTY_LEVELS } from '@/types'
import { getMatch } from '@/utils/matchingApi'

export default function MatchingForm(): JSX.Element {
  const [matchedUser, setMatchedUser] = useState<MatchResult>({
    user_id: -1,
    username: ''
  })
  const [criteria, setCriteria] = useState<MatchCriteria>({
    difficulty: ""
  })
  const toast = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setCriteria({ ...criteria, [fieldName]: e.target.value })
  };

  const handleClick = () => {
    const maxWait: Promise<void> = new Promise((resolve, reject) => {
    setTimeout(() => reject('Timeout'), MAX_MATCH_WAIT_S*1000)
    })
    const findMatch = async () => {
      const user = await getMatch(criteria)
      setMatchedUser(user)
    }
    const promise = Promise.race([maxWait, findMatch()]);

    // Will display the loading toast until the promise is either resolved
    // or rejected.
    toast.promise(promise, {
      success: { title: 'Found match', description: matchedUser.username },
      error: { title: 'Timeout', description: 'Could not find match' },
      loading: { title: 'Matching...', description: 'Please wait' },
    })
  }

  function isDisabled(): boolean {
    return criteria.difficulty == ""
  }

  return (
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

      <Button onClick={handleClick} isDisabled={isDisabled()}>
        Match
      </Button>
    </Stack>
  )
}


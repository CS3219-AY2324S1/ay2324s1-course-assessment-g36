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
  Center
} from '@chakra-ui/react'
import styles from "./MatchingForm.module.css"
import { MatchCriteria } from '@/interfaces'
import { DIFFICULTY_LEVELS } from '@/types'
import ResultModal from './ResultModal'

export default function MatchingForm(): JSX.Element {
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
      <Heading as='h2' size='xl' textAlign='center'>Find a peer to practice</Heading>
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
      <ResultModal isModalOpen={isOpen} onModalClose={onClose} criteria={criteria}/>
    </Stack>
    </>
  )
}


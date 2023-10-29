import styles from "./CodeConsole.module.css"
import { Stack, Heading, Flex, Button, Spacer, ButtonGroup } from "@chakra-ui/react"
import SkeletonLoader from '@/components/Loader/SkeletonLoader';
import { CodeResult } from '@/interfaces';
import CodeResultOutput from '../CodeResultOutput/CodeResultOutput';

interface IOwnProps {
  isResultsLoading: boolean;
  codeResult: CodeResult;
}

const BTN_SIZE = 'sm'

export default function CodeConsole({
  isResultsLoading,
  codeResult,
}: IOwnProps): JSX.Element {
  return <div className={styles.console_container}>
    <Stack>
      <Flex alignItems='center'>
        <Heading size='md'>Console</Heading>
        <Spacer />
        <ButtonGroup gap='1'>
          <Button colorScheme='whiteAlpha' size={BTN_SIZE}>Run code</Button>
          <Button colorScheme='green' size={BTN_SIZE}>Submit</Button>
        </ButtonGroup>
      </Flex>
      {isResultsLoading
        ? <SkeletonLoader />
        : <CodeResultOutput codeResult={codeResult} />
      }
    </Stack>
  </div>
}
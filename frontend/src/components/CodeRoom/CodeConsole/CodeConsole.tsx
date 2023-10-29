import { useState } from "react";
import styles from "./CodeConsole.module.css"
import { Stack, Heading, Flex, Button, Spacer, ButtonGroup } from "@chakra-ui/react"
import SkeletonLoader from '@/components/Loader/SkeletonLoader';
import { CodeResult } from '@/interfaces';
import CodeResultOutput from '../CodeResultOutput/CodeResultOutput';
import { executeCode } from "@/services/code_execution";

interface IOwnProps {
  programmingLanguage: string;
  codeFromEditor: string;
}

const BTN_SIZE = 'sm'

export default function CodeConsole({
  programmingLanguage,
  codeFromEditor,
}: IOwnProps): JSX.Element {

  const [isResultsLoading, setIsResultsLoading] = useState(false)
  const [codeResult, setCodeResult] = useState<CodeResult>({} as CodeResult)

  async function onRunCode() {
    setIsResultsLoading(true)
    try {
      const result: CodeResult = await executeCode(programmingLanguage, codeFromEditor)
      setCodeResult(result)
    } catch (e) {
      console.error(e)
    } finally {
      setIsResultsLoading(false)
    }
  }

  async function onSubmitCode() {
    alert("submitted code")
  }

  return <div className={styles.console_container}>
    <Stack>
      <Flex alignItems='center'>
        <Heading size='md'>Console</Heading>
        <Spacer />
        <ButtonGroup gap='1'>
          <Button colorScheme='whiteAlpha' size={BTN_SIZE} onClick={onRunCode}>Run code</Button>
          <Button colorScheme='green' size={BTN_SIZE} onClick={onSubmitCode}>Submit</Button>
        </ButtonGroup>
      </Flex>
      {isResultsLoading
        ? <SkeletonLoader />
        : <CodeResultOutput codeResult={codeResult} />
      }
    </Stack>
  </div>
}
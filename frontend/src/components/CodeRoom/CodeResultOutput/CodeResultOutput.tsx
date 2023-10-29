import { Stack, Heading } from "@chakra-ui/react";
import styles from "./CodeResultOutput.module.css"
import { CodeResult } from "@/interfaces";

interface IOwnProps {
  codeResult: CodeResult;
}

export default function CodeResultOutput({ codeResult }: IOwnProps): JSX.Element {

  // initial state
  if (Object.entries(codeResult).length === 0) {
    return <></>
  }

  const isApiCallFailed = !codeResult.status

  if (isApiCallFailed) {
    return <div className={styles.error}>Server error. Please try again later.</div>
  }

  const hasNoStdoutputOrStderr = !codeResult.stdout && !codeResult.stderr

  if (hasNoStdoutputOrStderr) {
    return <div>No output</div>
  }

  const output = codeResult.stdout || codeResult.stderr

  const outputList = output.split("\n")

  return (
    <Stack>
      <Heading size='sm'>
        {codeResult.stdout ? "Stdout" : "Stderr"}
      </Heading>
      <div className={styles.stdout_container}>
        {outputList.map(output => <p key={output}>{output}</p>)}
      </div>
    </Stack>
  )

}
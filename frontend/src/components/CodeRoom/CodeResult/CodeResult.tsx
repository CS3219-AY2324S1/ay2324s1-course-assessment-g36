import { Stack, Heading } from "@chakra-ui/react";
import styles from "./CodeResult.module.css"
import AlertBanner from "@/components/Feedback/AlertBanner";

interface IOwnProps {
  codeResultString: string;
}

export default function CodeResult({ codeResultString }: IOwnProps): JSX.Element {

  if (!codeResultString) {
    return <AlertBanner title="Oops!" message="Error executing code. Please try again later."/>
  }

  const outputList = codeResultString?.split("\n")

  return (
    <Stack>
      <Heading size='sm'>Stdout</Heading>
      <div className={styles.stdout_container}>
        {outputList.map(output => <p key={output}>{output}</p>)}
      </div>
    </Stack>
  )

}
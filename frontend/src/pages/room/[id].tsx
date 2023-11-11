import { useState, useEffect } from "react";
import Head from "next/head";
import CodeEditor from "@/components/CodeRoom/CodeEditor/CodeEditor";
import Sidebar from "@/components/CodeRoom/Sidebar/Sidebar";
import { Grid, GridItem } from "@chakra-ui/react";
import { QuestionObject } from "@/interfaces";
import io from "socket.io-client";
import { fetchQuestion } from "@/services/questions";
import CodeConsole from "@/components/CodeRoom/CodeConsole/CodeConsole";
import styles from "./room.module.css";

interface PageProps {
  id: string;
  question: QuestionObject;
}

const socket = io("http://localhost:5173");

const JOIN_ROOM_EVENT = "room:join";
const GET_LATEST_PROGRAMMING_LANGUAGE_EVENT = "programming_language:get";
const UPDATE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:update";
const RECEIVE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:receive";

export default function CodeRoom({ id, question }: PageProps) {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [programmingLanguage, setProgrammingLanguage] = useState("python");

  const [codeFromEditor, setCodeFromEditor] = useState("");
  const [selectedCodeFromEditor, setSelectedCodeFromEditor] = useState("");

  function onProgrammingLanguageChange(language: string) {
    setProgrammingLanguage(language);
    socket.emit(UPDATE_PROGRAMMING_LANGUAGE_EVENT, {
      language: language,
      room: id,
    });
  }

  function onCodeChange(code: string) {
    setCodeFromEditor(code);
  }

  useEffect(() => {
    if (!isDomLoaded) {
      socket.emit(JOIN_ROOM_EVENT, id);
      setIsDomLoaded(true);
    }

    // Handles the scenario where a user refreshes his page
    // It should display the latest programming language if it was changed earlier
    // Instead of displaying the default one (Python)
    socket.on(GET_LATEST_PROGRAMMING_LANGUAGE_EVENT, (data) => {
      setProgrammingLanguage(data.language);
      console.info("GOT LATEST PROGRAMMING LANGUAGE");
    });

    socket.on(RECEIVE_PROGRAMMING_LANGUAGE_EVENT, (data) => {
      setProgrammingLanguage(data.language);
      console.info(data);
    });
  }, [isDomLoaded, id]);

  return (
    <>
      <Head>
        <title>PeerPrep: Collaborative code room</title>
        <meta
          name="description"
          content="Question bank to ace your technical interviews"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.room_container}>
        <Grid
          templateAreas={`"sidebar code-editor"
                  "sidebar code-console"`}
          gridTemplateRows={"1fr auto"}
          gridTemplateColumns={"30% 70%"}
          h="100vh"
          gap={2}
        >
          {isDomLoaded && (
            <>
              <GridItem area={"sidebar"}>
                <Sidebar
                  roomId={id}
                  question={question}
                  programmingLanguage={programmingLanguage}
                  onProgrammingLanguageChange={onProgrammingLanguageChange}
                />
              </GridItem>
              <GridItem area={"code-editor"}>
                <CodeEditor
                  roomId={id}
                  programmingLanguage={programmingLanguage}
                  onCodeChange={onCodeChange}
                  onSelectedCodeChange={setSelectedCodeFromEditor}
                />
              </GridItem>
              <GridItem area={"code-console"}>
                <CodeConsole
                  programmingLanguage={programmingLanguage}
                  codeFromEditor={codeFromEditor}
                  selectedCodeFromEditor={selectedCodeFromEditor}
                  question={question}
                />
              </GridItem>
            </>
          )}
        </Grid>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;

  const { id, questionId } = query;

  const question = await fetchQuestion(questionId);

  return {
    props: {
      id,
      question,
    },
  };
}

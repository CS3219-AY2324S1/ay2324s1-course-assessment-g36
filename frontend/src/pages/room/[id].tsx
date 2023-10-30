import { useState, useEffect } from 'react';
import Head from 'next/head'
import CodeEditor from "@/components/CodeRoom/CodeEditor/CodeEditor"
import Sidebar from '@/components/CodeRoom/Sidebar/Sidebar';
import {
  Grid,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { QuestionObject } from '@/interfaces';
import io from "socket.io-client";
import { fetchQuestion } from '@/utils/questionApi';
import Loader from '@/components/Loader/Loader';

interface PageProps {
  id: string;
  question: QuestionObject;
}

const socket = io("http://localhost:5173")

const JOIN_ROOM_EVENT = "room:join"
const UPDATE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:update"
const RECEIVE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:receive"

export default function CodeRoom({ id, question }: PageProps) {
  const [isDomLoaded, setIsDomLoaded] = useState(false)
  const [programmingLanguage, setProgrammingLanguage] = useState("python")
  const { isOpen, onOpen, onClose } = useDisclosure()

  function onProgrammingLanguageChange(language: string) {
    setProgrammingLanguage(language)
    socket.emit(UPDATE_PROGRAMMING_LANGUAGE_EVENT, { language: language, room: id })
  }

  useEffect(() => {
    if (!isDomLoaded) {
      setIsDomLoaded(true);
      socket.emit(JOIN_ROOM_EVENT, id)
    }

    socket.on(RECEIVE_PROGRAMMING_LANGUAGE_EVENT, (data) => {
      setProgrammingLanguage(data.language)
    }) 
  }, [socket])

  if (!isDomLoaded) {
    return <Loader/>
  }

  return (
    <>
      <Head>
        <title>PeerPrep: Collaborative code room</title>
        <meta name="description" content="Question bank to ace your technical interviews" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid
          h='100vh'
          templateColumns='30% 70%'
        >
          {isDomLoaded && (<>
            <Sidebar 
              roomId={id} 
              question={question} 
              onOpen={onOpen} 
              programmingLanguage={programmingLanguage} 
              handleChange={onProgrammingLanguageChange}
            />
            <CodeEditor 
              roomId={id} 
              programmingLanguage={programmingLanguage} 
            />
            <Drawer
              size="sm"
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
            >
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Code results</DrawerHeader>
                <DrawerBody>
                  { programmingLanguage }
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>)}
        </Grid>
      </main >
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { query } = context;

  const { id, questionId } = query;

  let question;

  try {
    question = await fetchQuestion(questionId);
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      id,
      question
    },
  };
}

import { useState, useEffect } from 'react';
import Head from 'next/head'
import CodeEditor from "@/components/CodeEditor/CodeEditor"
import Sidebar from '@/components/Sidebar/Sidebar';
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

interface PageProps {
  id: string;
  question: QuestionObject
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
      setIsDomLoaded(true)
      socket.emit(JOIN_ROOM_EVENT, id)
    }

    socket.on(RECEIVE_PROGRAMMING_LANGUAGE_EVENT, (data) => {
      setProgrammingLanguage(data.language)
      console.info(data)
    }) 
  }, [socket])

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
          h='200px'
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

  // Access the 'id' and 'difficulty' query parameter from the URL
  const { id, difficulty } = query;

  // TODO: Update with API call to get question based on a set of criteria during matching
  const mockEasyQuestion = {
    "id": 2,
    "title": "Linked List Cycle Detection",
    "categories": ["Data Structures", "Algorithms"],
    "complexity": "Easy",
    "link": "https://leetcode.com/problems/linked-list-cycle/",
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.\n\nReturn true if there is a cycle in the linked list. Otherwise, return false."
  };

  const mockMediumQuestion = {
    "id": 8,
    "title": "Repeated DNA Sequences",
    "categories": ["Algorithms", "Bit Manipulation"],
    "complexity": "Medium",
    "link": "https://leetcode.com/problems/repeated-dna-sequences/",
    "description": "The DNA sequence is composed of a series of nucleotides abbreviated as 'A','C', 'G', and 'T'.\n\nFor example, 'ACGAATTCCG' is a DNA sequence. When studying DNA, it is useful to identify repeated sequences within the DNA.\n\nGiven a string s that represents a DNA sequence, return all the 10-letter long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order."
  };

  const mockHardQuestion = {
    "id": 15,
    "title": "Sliding Window Maximum",
    "categories": ["Arrays, Algorithms"],
    "complexity": "Hard",
    "link": "https://leetcode.com/problems/sliding-window-maximum/",
    "description": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\n Return the max sliding window."
  };

  let question = mockEasyQuestion

  if (difficulty === "Medium") {
    question = mockMediumQuestion
  }
  if (difficulty === "Hard") {
    question = mockHardQuestion
  }

  return {
    props: {
      id,
      question
    },
  };
}

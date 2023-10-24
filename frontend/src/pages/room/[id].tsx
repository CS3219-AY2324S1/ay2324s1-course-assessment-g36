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

interface PageProps {
  id: string;
  question: QuestionObject
}

export default function CodeRoom({ id, question }: PageProps) {

  const [isDomLoaded, setIsDomLoaded] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setIsDomLoaded(true)
  }, [])

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
            <Sidebar roomId={id} question={question} onOpen={onOpen} />
            <CodeEditor roomId={id} />
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
                  ...
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

  // Access the 'id' query parameter from the URL
  const { id } = query;

  // TODO: Update with API call to get question based on a set of criteria during matching
  const mockQuestion = {
    "id": 8,
    "title": "Repeated DNA Sequences",
    "categories": ["Algorithms", "Bit Manipulation"],
    "complexity": "Medium",
    "link": "https://leetcode.com/problems/repeated-dna-sequences/",
    "description": "The DNA sequence is composed of a series of nucleotides abbreviated as 'A','C', 'G', and 'T'.\n\nFor example, 'ACGAATTCCG' is a DNA sequence. When studying DNA, it is useful to identify repeated sequences within the DNA.\n\nGiven a string s that represents a DNA sequence, return all the 10-letter long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order."
  };

  return {
    props: {
      id,
      question: mockQuestion
    },
  };
}

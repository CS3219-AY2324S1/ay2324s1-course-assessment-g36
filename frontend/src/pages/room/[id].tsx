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

interface PageProps {
  id: string;
}

export default function CodeRoom({ id }: PageProps) {

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
            <Sidebar roomId={id} onOpen={onOpen} />
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

  return {
    props: {
      id,
    },
  };
}

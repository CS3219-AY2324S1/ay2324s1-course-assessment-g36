import { Spinner, Center } from "@chakra-ui/react";

export default function SpinnerLoader(): JSX.Element {
    return (
    <Center height="100vh" >
        <Spinner color='blue.500' thickness='2px' size='lg'/> 
    </Center>
)}
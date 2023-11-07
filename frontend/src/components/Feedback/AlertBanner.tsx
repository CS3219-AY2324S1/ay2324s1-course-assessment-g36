import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from "@chakra-ui/react";

interface IOwnProps {
  title: string;
  message: string;
}

export default function AlertBanner({ title, message }: IOwnProps) {
  return (
    <Alert status="error">
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Box>
    </Alert>
  );
}

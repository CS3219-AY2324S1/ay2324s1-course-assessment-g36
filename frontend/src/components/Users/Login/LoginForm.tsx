import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Stack,
  Link,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LoginForm } from "@/interfaces";

import styles from "./LoginForm.module.css";
import { useState } from "react";
import { loginUser } from "@/services/users";
import { useAuth } from "@/utils/auth";

export default function LoginForm(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const toast = useToast();
  const { setToken } = useAuth();

  const handlePasswordClick = () => setShow(!show);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    setLoginForm({ ...loginForm, [fieldName]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setIsFormSubmitting(true);

    try {
      const token = await loginUser(loginForm);
      setToken(token);
    } catch (error: any) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setIsFormSubmitting(false);
    }
  };

  function isDisabled(): boolean {
    return loginForm.username == "" || loginForm.password == "";
  }

  return (
    <Stack
      as="form"
      className={styles.form_container}
      spacing="20px"
      onSubmit={handleSubmit}
    >
      <Heading as="h2" size="xl" textAlign="center">
        Login
      </Heading>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter username"
          value={loginForm.username}
          onChange={(e) => handleChange(e, "username")}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={loginForm.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        type="submit"
        colorScheme="blue"
        isDisabled={isDisabled()}
        isLoading={isFormSubmitting}
      >
        Continue
      </Button>
      <Text align="center">
        Do not have an account yet?{" "}
        <Link as={NextLink} href="/register" color="blue.400">
          Register here
        </Link>
      </Text>
    </Stack>
  );
}

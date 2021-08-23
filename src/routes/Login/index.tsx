import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Form from "components/Form";
import { API_POST_LOGIN } from "constants/api";
import { COOKIE_TIKTOK_LOGIN } from "constants/cookie";
import useUserContext from "context/useUserContext";
import { apiPost } from "helpers/api";
import { setCookie } from "helpers/cookie";
import useFormData from "hooks/useFormData";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { IUser } from "types/interfaces/IUser";

type TFormFields = "email" | "password";

const LoginPage = () => {
  const { userState, userAct } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const { getFormValue, getFormItem, getInputProps } = useFormData<TFormFields>(
    [
      { name: "email", value: "" },
      { name: "password", value: "" },
    ]
  );

  const login = async () => {
    setErrorMsg("");
    setIsLoading(true);
    const res = await apiPost(API_POST_LOGIN, {
      email: getFormValue("email"),
      password: getFormValue("password"),
    });

    if (res.ok && res.data.data) {
      const { email, id } = res.data.data;

      const user: IUser = {
        name: email,
        id: id,
      };
      setCookie(COOKIE_TIKTOK_LOGIN, user, 30);

      userAct.setUser(user);
      history.replace("/tenant");
    } else if (res.data.data === null) {
      setErrorMsg("Email / Password tidak tepat");
    } else {
      setErrorMsg("Oops terjadi pada kesalahan server");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (userState.user) {
      history.replace("/tenant");
    }
  }, [history, userState.user]);

  return (
    <Center bg="gray.200" h="100vh">
      <Box px="8" py="12" bg="white" rounded="lg" w="90%" maxW="450px">
        <Form onSubmit={login}>
          <Heading mb="2">Warung Tiktok</Heading>
          <Text mb="8" fontSize="sm">
            Silahkan masukan email & password untuk akun Cashier / Tenant
          </Text>

          {errorMsg && (
            <Alert status="error" mb="4">
              <AlertIcon />
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          <Stack spacing="2">
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" {...getInputProps("email")} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" {...getInputProps("password")} />
            </FormControl>
          </Stack>

          <Center>
            <Button
              px="16"
              mt={4}
              colorScheme="red"
              isLoading={isLoading}
              type="submit"
              size="lg"
            >
              Login
            </Button>
          </Center>
        </Form>
      </Box>
    </Center>
  );
};

export default LoginPage;

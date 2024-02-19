import {
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useSendEmailVerification } from "../hooks/requestEmailVerification";
import { useLocation } from "react-router-dom";

type LocationState = {
  email: string;
};

const RegistrationSuccess = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const { email } = state;
  const toast = useToast();
  const { mutate: sendEmailVerification, isLoading } = useSendEmailVerification();

  const resendVerificationEmail = () => {
    sendEmailVerification(undefined, {
      onSuccess: (response) => {
        toast({
          title: "Verification Email Sent",
          description: response.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Unable to send verification email.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center">
      <VStack spacing={5} p={8}>
        <Heading size="lg" textAlign="center">
          Congratulations!
        </Heading>
        <Text textAlign="center">
          Your account has been successfully created.
        </Text>
        <Text textAlign="center">
          We've sent a verification link to <Text as="span" fontWeight="semibold">{email}</Text>. Please check your email to verify your account.
        </Text>
        <Button
          onClick={resendVerificationEmail}
          colorScheme="blue"
          isLoading={isLoading}
          loadingText="Sending..."
          isDisabled={isLoading}
        >
          Resend Verification Email
        </Button>
      </VStack>
    </Flex>
  );
};

export default RegistrationSuccess;

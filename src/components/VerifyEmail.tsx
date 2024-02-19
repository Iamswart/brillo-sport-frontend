import { Button, Flex, Heading, Box, Text, useColorModeValue, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useVerifyEmail } from "../hooks/verifyEmail";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");


  const { isLoading, data, error } = useVerifyEmail(token ?? "");

  useEffect(() => {
    if (!token) {
      navigate("/error");
      return;
    }
  }, [token, navigate]);

  useEffect(() => {
    if (data?.success) {
      toast({
        title: "Email Verification",
        description: "Email verified successfully. You can now access all the features of your account.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/profile/dashboard", { replace: true });
    }
  }, [data, navigate]);

  if (isLoading) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        bg={useColorModeValue("gray.50", "gray.800")}
        px={4}
      >
        <Box textAlign="center">
          <Heading mb={4}>Verification Error</Heading>
          <Text mb={8}>
            There was a problem verifying your email. Please try again later or contact support for assistance.
          </Text>
          <Button colorScheme="red" onClick={() => navigate("/login")}>
            Return to Login
          </Button>
        </Box>
      </Flex>
    );
}

return null;
}
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  PinInput,
  PinInputField,
  Spinner,
  Stack,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useSendPhoneVerification } from "../hooks/requestPhoneVerification";
import { useUserProfile } from "../hooks/userProfile";
import { useVerifyPhone } from "../hooks/verifyPhone";

const tokenSchema = z.object({
  token: z.string().refine((value) => value !== "", "OTP is required"),
});
type TokenFormData = z.infer<typeof tokenSchema>;

export default function VerifyPhone() {
  const [tokenValue, setTokenValue] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useUserProfile();
  const verifyPhoneMutation = useVerifyPhone();
  const sendPhoneVerificationMutation = useSendPhoneVerification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TokenFormData>({
    resolver: zodResolver(tokenSchema),
  });

  useEffect(() => {
    register("token");
  }, [register]);

  useEffect(() => {
    setValue("token", tokenValue);
  }, [tokenValue, setValue]);

  const onSubmit = (data: TokenFormData) => {
    verifyPhoneMutation.mutate(
      { token: data.token },
      {
        onSuccess: () => {
          toast({
            title: "Phone Verification",
            description: "Phone verified successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/profile/dashboard");
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            "Verification failed. Please try again.";
          toast({
            title: "Verification Error.",
            description: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  const requestOTP = () => {
    sendPhoneVerificationMutation.mutate(undefined, {
      onSuccess: (response) => {
        toast({
          title: "OTP Request",
          description: response.message || "OTP sent to your phone.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: any) => {
        toast({
          title: "OTP Request Failed",
          description:
            error?.response?.data?.message ||
            "Failed to send OTP. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  if (userLoading || verifyPhoneMutation.isLoading) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Stack align={"center"} mb={8}>
          <Heading fontSize={"2xl"}>Verify Your Phone</Heading>
        </Stack>
        <Button
          onClick={requestOTP}
          colorScheme="teal"
          variant="outline"
          mb={4}
        >
          Send OTP
        </Button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.token}>
            <Center>
              <HStack>
                <PinInput
                id="code"
                  onChange={(value) => setTokenValue(value)}
                >
                  <PinInputField  />
                  <PinInputField  />
                  <PinInputField  />
                  <PinInputField  />
                </PinInput>
              </HStack>
            </Center>
            <FormErrorMessage>{errors.token?.message}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6} mt={4}>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={verifyPhoneMutation.isLoading}
            >
              Verify
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}

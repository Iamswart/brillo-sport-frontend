import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForgotPassword } from "../hooks/forgotPassword";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Check Your Email",
          description:
            "If the email you entered is registered with us, you will receive a password reset email shortly. Please check your inbox and follow the instructions. If you don't receive an email, please check your spam folder.",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: (error: any) => {
        toast({
          description: "If the email you entered is registered with us, you will receive a password reset email shortly. Please check your inbox and follow the instructions. If you don't receive an email, please check your spam folder.",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Stack align={"center"} mb={8}>
          <HStack>
            <Image
              src={
                "https://res.cloudinary.com/dfscst5lw/image/upload/v1693922785/Thrive-Together/1605.m00.i104.n045.P.c25.370135319_Vector_atom._Physics_atom_model_with_electrons-removebg-preview_aniqf5.png"
              }
              boxSize="80px"
              objectFit="cover"
            />
            <Heading fontSize={"2xl"}>
            Brillo <br />  Connectz
            </Heading>
          </HStack>

          <Heading fontSize={"lg"}>Reset Password</Heading>
          <small>Enter the email linked to your Brillo Connectz Account</small>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              {...register("email")}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6} mt={4}>
            <Button
              bgColor="#3048C1"
              color={"white"}
              _hover={{
                bg: "#3048C1",
              }}
              type="submit"
              isLoading={forgotPasswordMutation.isLoading}
            >
              Request Reset
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}

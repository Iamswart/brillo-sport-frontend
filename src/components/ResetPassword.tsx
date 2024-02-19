import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
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
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePasswordReset } from "../hooks/resetPassword";

const passwordSchema = z
  .string()
  .min(8, "Password should be at least 8 characters")
  .refine(
    (password) => /[A-Z]/.test(password),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (password) => /[a-z]/.test(password),
    "Password must contain at least one lowercase letter"
  )
  .refine(
    (password) => /[0-9]/.test(password),
    "Password must contain at least one number"
  )
  .refine(
    (password) => /[!@#\$%\^&\*]/.test(password),
    "Password must contain at least one special character"
  );

const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const passwordResetMutation = usePasswordReset();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/error");
    }
  }, [navigate, token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    if (!token) return;

    passwordResetMutation.mutate(
      { newPassword: data.password, token },
      {
        onSuccess: () => {
          toast({
            title: "Password Reset Successful",
            description:
              "Your password has been reset successfully. Please login with your new password.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/login");
        },
        onError: (error: any) => {
          toast({
            title: "Reset Password Error",
            description:
              error.response?.data?.message ||
              "An error occurred while resetting the password.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} >
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
              Brillo <br /> Connectz
            </Heading>
          </HStack>
        </Stack>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Enter new password
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            id="confirmPassword"
            isInvalid={!!errors.confirmPassword}
          >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.confirmPassword && (
              <FormErrorMessage>
                {errors.confirmPassword.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <Stack spacing={6} mt={4}>
            <Button
               bgColor="#3048C1"
              color={"white"}
              _hover={{
                bg: "#3048C1",
              }}
              type="submit"
              isLoading={passwordResetMutation.isLoading}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}

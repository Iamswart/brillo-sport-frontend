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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useChangePassword } from "../hooks/changePassword";
import { logout } from "../hooks/logout";

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

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .refine((value) => value !== "", "Current Password is required"),
  newPassword: passwordSchema,
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const changePasswordMutation = useChangePassword();

  const onSubmit = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Password Changed successfully.",
          description:
            "Password has been changed successfully. Try logging in again.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        logout();
        navigate("/login");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.errorMessage?.split("|")[1]?.trim() ||
          "There was an error verifying the email.";
        if (errorMessage.includes("Error occured while validating token")) {
          toast({
            title: "Expired Session",
            description: "Please Login again to continue",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          logout();
          navigate("/login");
          return null;
        }
        toast({
          title: "Verification Error.",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Flex
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
              Brillo <br /> Connectz
            </Heading>
          </HStack>
        </Stack>
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Enter new password
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="oldPassword" isInvalid={!!errors.oldPassword}>
            <FormLabel htmlFor="password">Current Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                {...register("oldPassword")}
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
            <FormErrorMessage>{errors.oldPassword?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="confirmPassword" isInvalid={!!errors.newPassword}>
            <FormLabel>New Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showConfirmPassword ? "text" : "password"}
                {...register("newPassword")}
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
            <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
          </FormControl>

          <Stack spacing={6} mt={4}>
            <Button
              bgColor="#3048C1"
              color={"white"}
              _hover={{
                bg: "#3048C1",
              }}
              type="submit"
              isLoading={changePasswordMutation.isLoading}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}

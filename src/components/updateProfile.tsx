import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { UpdateProfileInput, useUpdateProfile } from "../hooks/updateProfile";
import { useUserProfile } from '../hooks/userProfile';

const completeProfileSchema = z.object({
  gender: z
    .string()
    .refine((value) => ["Male", "Female", "others"].includes(value), {
      message: "Gender must be 'male', 'female', or 'others'",
      path: ["gender"],
    }),
  email: z.string().email("Invalid email format"),
  userName: z.string().min(1, "Username is required"),
});

type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

export default function CompleteProfileEdit() {
  const toast = useToast();
  const navigate = useNavigate();
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile();
  const completeProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
  });

  useEffect(() => {
    if (userProfile) {
      setValue('email', userProfile.email);
      setValue('userName', userProfile.userName);
      setValue('gender', userProfile.gender || '');
    }
  }, [userProfile, setValue]);
  
  const onSubmit = (data: CompleteProfileFormData) => {
    const profileData: UpdateProfileInput = {
      ...data,
      gender: data.gender as "Male" | "Female" | "others" | undefined,
    };

    completeProfileMutation.mutate(profileData, {
      onSuccess: () => {
        toast({
          title: "Profile Completed",
          description: "Your profile has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/profile/dashboard");
      },
      onError: (error: any) => {
        toast({
          title: "Profile Update Error.",
          description:
            error?.response?.data?.message ||
            "There was an error updating your profile.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  if (isLoadingProfile) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justify="center"
      
    >
      <Stack
        spacing={4}
        w="full"
        maxW="md"
        bg={useColorModeValue("white", "gray.700")}
        rounded="xl"
        boxShadow="lg"
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Complete Your Profile
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.userName}>
            <FormLabel>Username</FormLabel>
            <Input id="userName" {...register("userName")} />
            <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" id="email" {...register("email")} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.gender}>
            <FormLabel>Gender</FormLabel>
            <Select id="gender" {...register("gender")}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="others">Others</option>
            </Select>
            <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="blue"
            isLoading={completeProfileMutation.isLoading}
            type="submit"
          >
            Update Profile
          </Button>
        </form>
      </Stack>
    </Flex>
  );
}



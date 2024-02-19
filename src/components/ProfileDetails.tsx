import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSendEmailVerification } from "../hooks/requestEmailVerification";
import { useUserProfile } from "../hooks/userProfile";

const ProfileDetails = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const { data: user, isLoading } = useUserProfile();
  const { mutate: sendEmailVerification } = useSendEmailVerification();

  if (isLoading) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Text>Loading profile...</Text>
      </Flex>
    );
  }

  const handleEmailVerification = () => {
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
          title: "Failed to Send Verification Email",
          description: error?.message || "Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      minH="100vh"
      pt={10}
    >
      {!user?.isEmailVerified && (
        <Box
          bg="white"
          p={4}
          rounded="md"
          shadow="md"
          mb={4}
          w="full"
          maxW="md"
        >
          <Heading size="md" mb={2}>
            Email Verification Needed
          </Heading>
          <Text mb={4}>Please verify your email to unlock all features.</Text>
          <Button colorScheme="blue" onClick={handleEmailVerification}>
            Verify Email
          </Button>
        </Box>
      )}

      {!user?.isPhoneVerified && (
        <Box
          bg="white"
          p={4}
          rounded="md"
          shadow="md"
          mb={4}
          w="full"
          maxW="md"
        >
          <Heading size="md" mb={2}>
            Phone Verification Needed
          </Heading>
          <Text mb={4}>
            Please verify your phone number for additional security.
          </Text>
          <Button
            colorScheme="green"
            onClick={() => navigate("/profile/verify-phone")}
          >
            Verify Phone
          </Button>
        </Box>
      )}

      <Box w="full" maxW="md" mb={6} position="relative">
        {" "}
        <Image
          src="https://via.placeholder.com/500x200?text=Cover+Image"
          alt="Cover image"
          objectFit="cover"
          w="full"
          h="200px"
        />
        <Avatar
          size="2xl"
          name={user?.userName}
          src="https://via.placeholder.com/150"
          position="absolute"
          bottom="-50px"
          left="50%"
          transform="translateX(-50%)"
          border="4px solid white"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
        />
      </Box>

      <VStack spacing={4} align="center" w="full" maxW="md" mt={8}>
        <Heading>{user?.userName}</Heading>
        <Text>{user?.email}</Text>
        <Text>{user?.phone}</Text>

        <Stack direction="row" spacing={4}>
          {user?.interests?.map((interest) => (
            <Tag key={interest._id} colorScheme="blue">
              {interest.name}
            </Tag>
          ))}
        </Stack>

        <Button
          colorScheme="teal"
          onClick={() => navigate("/profile/selects-sport")}
        >
          Add Sport Interest
        </Button>
      </VStack>
    </Flex>
  );
};

export default ProfileDetails;

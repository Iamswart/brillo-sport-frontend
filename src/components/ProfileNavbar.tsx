import {
  Flex,
  Image,
  Spinner,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../hooks/logout";
import { useUserProfile } from "../hooks/userProfile";

function ProfileNavbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const linkColor = useColorModeValue('blue.600', 'blue.200');

  const { data: userInfo, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    const errorMessage =
      error?.message?.split("|")[1]?.trim() || "Something went wrong";
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
      title: "Error.",
      description: errorMessage,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    logout();
    navigate("/login");
    return null;
  }
  return (
    <Flex
      justify="space-between"
      align="center"
      padding="1rem"
      bg={useColorModeValue("gray.200", "gray.900")}
      color="black"
    >
      <Link to={"/profile/dashboard"}>
        <Image
          src="https://res.cloudinary.com/dfscst5lw/image/upload/v1693922785/Thrive-Together/1605.m00.i104.n045.P.c25.370135319_Vector_atom._Physics_atom_model_with_electrons-removebg-preview_aniqf5.png"
          alt="Company Logo"
          boxSize="50px"
        />
      </Link>

      <Flex gap="8" display={{base: "none", md: "flex"}}>
        <Link to="/profile/dashboard" color={linkColor}>
          Profile
        </Link>
        <Link to="#" color={linkColor}>
          Buddies
        </Link>
        <Link to="#" color={linkColor}>
          Discover
        </Link>
        <Link to="/profile/settings" color={linkColor}>
          Settings
        </Link>
      </Flex>
    </Flex>
  );
}

export default ProfileNavbar;

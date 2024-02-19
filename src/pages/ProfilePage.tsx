import ProfileNavbar from "../components/ProfileNavbar";

import {
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import ProfileDetails from "../components/ProfileDetails";

function ProfilePage() {
  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex direction="column" backgroundColor="white">
      <ProfileNavbar />
      <ProfileDetails />
    </Flex>
  );
}

export default ProfilePage;

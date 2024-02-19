import ProfileNavbar from "../components/ProfileNavbar";

import {
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import ChangePassword from "../components/ChangePassword";

function ChangePasswordPage() {
  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex direction="column"  backgroundColor="white">
      <ProfileNavbar />
      <ChangePassword />
    </Flex>
  );
}

export default ChangePasswordPage;

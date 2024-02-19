import { Flex } from "@chakra-ui/react";

import ProfileNavbar from "../components/ProfileNavbar";
import VerifyEmail from "../components/VerifyEmail";

function VerifyEmailPage() {

  return (
    <Flex direction="column" height="100vh" backgroundColor="white">
      <ProfileNavbar />
      <VerifyEmail />
    </Flex>
  );
}

export default VerifyEmailPage;

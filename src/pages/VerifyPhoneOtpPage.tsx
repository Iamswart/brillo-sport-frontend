import ProfileNavbar from "../components/ProfileNavbar";

import {
    Flex
} from "@chakra-ui/react";

import VerifyPhone from "../components/VerifyPhone";

function VerifyPhonePage() {

  return (
    <Flex direction="column" height="100vh" backgroundColor="white">
      <ProfileNavbar />
      <VerifyPhone />
    </Flex>
  );
}

export default VerifyPhonePage;

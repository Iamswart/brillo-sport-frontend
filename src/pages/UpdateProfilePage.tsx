import ProfileNavbar from "../components/ProfileNavbar";

import {
  Flex
} from "@chakra-ui/react";
import UpdateProfile from "../components/updateProfile";

function UpdateProfilePage() {

  return (
    <Flex direction="column"  backgroundColor="white">
      <ProfileNavbar />
      <UpdateProfile />
    </Flex>
  );
}

export default UpdateProfilePage;

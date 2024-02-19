import ProfileNavbar from "../components/ProfileNavbar";

import { Flex } from "@chakra-ui/react";
import SelectSportsInterest from "../components/SelectSportsInterest";

function AddSportsPage() {
  return (
    <Flex direction="column" backgroundColor="white">
      <ProfileNavbar />
      <SelectSportsInterest />
    </Flex>
  );
}

export default AddSportsPage;

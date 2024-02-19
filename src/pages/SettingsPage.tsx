import ProfileNavbar from "../components/ProfileNavbar";
import {
    Flex
} from "@chakra-ui/react";
import SettingsComponent from "../components/Settings";

function SettingsPage() {
  return (
    <Flex direction="column" backgroundColor="white">
      <ProfileNavbar />
      <SettingsComponent />
    </Flex>
  );
}

export default SettingsPage;

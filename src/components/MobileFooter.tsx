import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProfileSvg from "../assets/profile.svg";
import ReportsSvg from "../assets/reports.svg";
import HomeSvg from "../assets/home.svg";
import ChatSvg from "../assets/chat.svg";

const MobileFooter = () => {
  const menuItems = [
    { label: "Profile", icon: ProfileSvg, to: "/profile/dashboard" },
    { label: "Discover", icon: ReportsSvg, to: "#" },
    { label: "Buddies", icon: HomeSvg, to: "#" },
    { label: "Settings", icon: ChatSvg, to: "/profile/settings" },
  ];

  return (
    <Flex
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="white"
      justifyContent="space-around"
      alignItems="center"
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)"
      p={2}
    >
      {menuItems.map((item, index) => (
        <Link to={item.to} key={index} style={{ textAlign: "center", width: "100%" }}>
          <VStack spacing={1}>
            <Image src={item.icon} boxSize="20px" />
            <Text
              fontSize="xs"
              color="#C1C4CD"
              fontWeight="450"
              lineHeight="normal"
            >
              {item.label}
            </Text>
          </VStack>
        </Link>
      ))}
    </Flex>
  );
};

export default MobileFooter;

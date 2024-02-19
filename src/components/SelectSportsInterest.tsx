import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSports } from "../hooks/getAllSport";
import { useUpdateSport } from "../hooks/updateSport";
import { useUserProfile } from "../hooks/userProfile";

export default function SelectSportsInterest() {
  const toast = useToast();
  const navigate = useNavigate();
  const { data: sports, isLoading: loadingSports } = getAllSports();
  const { data: userProfile, isLoading: loadingUserProfile } = useUserProfile();
  const updateSportMutation = useUpdateSport();
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  useEffect(() => {
    if (userProfile && userProfile.interests) {
      setSelectedSports(userProfile.interests.map(interest => interest._id));
    }
  }, [userProfile]);

  useEffect(() => {
    if (updateSportMutation.isSuccess) {
      toast({
        title: "Success",
        description: "Your sports interests have been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/profile/dashboard");
    }
  }, [updateSportMutation.isSuccess, navigate, toast]);

  const handleInterestChange = (sportId: string) => {
    setSelectedSports(prevSelectedSports =>
      prevSelectedSports.includes(sportId)
        ? prevSelectedSports.filter(id => id !== sportId)
        : [...prevSelectedSports, sportId]
    );
  };

  const handleSaveInterests = () => {
    updateSportMutation.mutate({ sportIds: selectedSports });
  };

  if (loadingSports || loadingUserProfile) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Heading>Loading...</Heading>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center" p={5}>
      <Box w="full" maxW="960px">
        <Heading mb={4}>Select Your Sports Interests</Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
          {sports?.map(sport => (
            <Checkbox
              key={sport._id}
              value={sport._id}
              isChecked={selectedSports.includes(sport._id)}
              onChange={() => handleInterestChange(sport._id)}
            >
              {sport.name}
            </Checkbox>
          ))}
        </SimpleGrid>
        <Button
          mt={4}
          colorScheme="blue"
          onClick={handleSaveInterests}
          isLoading={updateSportMutation.isLoading}
        >
          Save Interests
        </Button>
      </Box>
    </Flex>
  );
}

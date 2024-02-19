import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, BoxProps, Divider, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { logout } from '../hooks/logout';

interface SettingsItemProps extends BoxProps {
    label: string;
    to: string;
    action?: () => void; 
  }

const SettingsComponent = () => {
  const bg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <VStack
      spacing={0}
      align="stretch"
      bg={bg}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
    >
      <SettingsItem label="Update your information" to="/profile/update-profile" />
      <Divider />
      <SettingsItem label="Update sport interest" to="/profile/selects-sport" />
      <Divider />
      <SettingsItem label="Change password" to="/profile/change-password" />
      <Divider />
      <SettingsItem label="Logout" to="/" action={logout} />
    </VStack>
  );
};

const SettingsItem = ({ label, to, action }: SettingsItemProps ) => {
  return (
    <Box
      as={Link}
      to={to}
      p={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
      onClick={(e) => {
        if (action) {
          e.preventDefault();
          action();
        }
      }}
    >
      <Box>{label}</Box>
      <ChevronRightIcon />
    </Box>
  );
};

export default SettingsComponent;

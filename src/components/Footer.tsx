import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";

export default function LargeWithLogoCentered() {
  return (
    <Box py={3} mt={16} >
      <Flex
        align={"center"}
        _before={{
          content: '""',
          borderBottom: "1px solid",
          borderColor: useColorModeValue("gray.500", "gray.700"),
          flexGrow: 1,
          mr: 8,
        }}
        _after={{
          content: '""',
          borderBottom: "1px solid",
          borderColor: useColorModeValue("gray.500", "gray.700"),
          flexGrow: 1,
          ml: 8,
        }}
      >
        <Image
          src={
            "https://res.cloudinary.com/dfscst5lw/image/upload/v1693922785/Thrive-Together/1605.m00.i104.n045.P.c25.370135319_Vector_atom._Physics_atom_model_with_electrons-removebg-preview_aniqf5.png"
          }
          boxSize="60px"
          objectFit="cover"
        />
      </Flex>
      <Text py={3} fontSize={"sm"} textAlign={"center"}>
        © 2024 Brillo Connectz. All rights reserved
      </Text>
    </Box>
  );
}

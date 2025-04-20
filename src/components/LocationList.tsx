import { Box, Text, useColorMode } from "@chakra-ui/react";
import { LocationListProps } from "@/types/types";

const LocationList: React.FC<LocationListProps> = ({
  locations,
  onLocationClick,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p={2}
      borderWidth="1px"
      borderRadius="lg"
      bg={colorMode === "dark" ? "gray.800" : "gray.50"}
      maxH="300px"
      overflowY="auto"
      width="100%"
    >
      <Box>
        {locations.map((loc, index) => (
          <Text
            key={loc.id}
            fontSize="md"
            mb={2}
            p={2}
            borderRadius={8}
            onClick={() => onLocationClick(loc.id)}
            cursor="pointer"
            _hover={{
              bg: colorMode === "dark" ? "gray.700" : "gray.200",
            }}
          >
            <Text as="span" fontWeight="bold" color="teal.500" mr={4}>
              {index + 1}.
            </Text>
            {loc.name}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default LocationList;

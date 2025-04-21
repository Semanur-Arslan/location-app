"use client";
import { useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Text,
  Button,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/types/redux";
import { FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";
import Title from "@/components/Title";

const LocationList = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  function handleRouteClick(route: string) {
    router.push(route);
  }

  function handleIconClick(locId: string) {
    setSelectedId((prev) => (prev === locId ? null : locId));
  }

  function handleEditClick(locId: string, e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/edit/${locId}`);
  }
  return (
    <Box p={6} height="100%">
      <VStack align="start" spacing={6}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Title text="Saved Locations" />
          <Flex gap={2} pe={24}>
            <Button
              colorScheme="teal"
              onClick={() => handleRouteClick("route")}
            >
              Show Route
            </Button>
            <Button colorScheme="gray" onClick={() => handleRouteClick("/")}>
              Add New Location
            </Button>
          </Flex>
        </Flex>

        {locations.length === 0 ? (
          <Text>No saved location found.</Text>
        ) : (
          <Stack spacing={4} width="100%">
            {locations.map((loc) => (
              <Box
                key={loc.id}
                borderWidth={1}
                borderRadius="lg"
                p={{ base: 2, lg: 4 }}
                _hover={{ boxShadow: "md" }}
              >
                <Flex justify="space-between" align="center" gap={4}>
                  <Flex
                    gap={6}
                    flexWrap="wrap"
                    flex="1"
                    minW={0}
                    align="center"
                  >
                    <Text
                      fontWeight="medium"
                      fontSize={{ base: "md", md: "lg" }}
                      wordBreak="break-word"
                      maxW={{ base: "full", md: "250px" }}
                    >
                      {loc.name}
                    </Text>

                    <IconButton
                      aria-label="Toggle Location"
                      icon={<FaMapMarkerAlt />}
                      size="md"
                      variant="ghost"
                      color={loc.color}
                      fontSize={{ base: "20px", md: "24px" }}
                      borderRadius="0"
                      transition="all 0.2s ease"
                      _hover={{
                        transform: "scale(1.1)",
                        borderBottom: `2px solid ${loc.color}`,
                      }}
                      onClick={() => handleIconClick(loc.id)}
                    />

                    {selectedId === loc.id && (
                      <VStack spacing={2} fontSize="sm" align="flex-start">
                        <HStack spacing={1}>
                          <Text fontWeight="medium">Lat:</Text>
                          <Text>{loc.lat.toFixed(4)}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Text fontWeight="medium">Lng:</Text>
                          <Text>{loc.lng.toFixed(4)}</Text>
                        </HStack>
                      </VStack>
                    )}
                  </Flex>

                  <IconButton
                    aria-label="Edit Location"
                    icon={<FaChevronRight />}
                    size="md"
                    variant="ghost"
                    color="gray"
                    alignSelf={{ base: "flex-end", sm: "center" }}
                    onClick={(e) => handleEditClick(loc.id, e)}
                  />
                </Flex>
              </Box>
            ))}
          </Stack>
        )}
      </VStack>
    </Box>
  );
};

export default LocationList;

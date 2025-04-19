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
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Title } from "@/components/Title";

const LocationList = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Box p={6}>
      <VStack align="start" spacing={6}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Title text="Saved Locations" />

          <Button color="teal.500" onClick={() => router.push("route")}>
            Show Route
          </Button>
        </Flex>

        {locations.length === 0 ? (
          <Text>No saved location found.</Text>
        ) : (
          <Stack spacing={4} width="100%">
            {locations.map((loc) => (
              <Box key={loc.id} borderWidth={1} borderRadius="lg" p={4}>
                <HStack justify="space-between" align="center">
                  <HStack>
                    <Text fontWeight="medium" minWidth="200">
                      {loc.name}
                    </Text>

                    <Box
                      color={loc.color}
                      fontSize="24px"
                      borderBottom="2px solid white"
                      transition="all 0.2s ease"
                      _hover={{
                        borderBottom: `2px solid ${loc.color}`,
                      }}
                      onClick={() =>
                        setSelectedId((prev) =>
                          prev === loc.id ? null : loc.id
                        )
                      }
                    >
                      <Icon as={FaMapMarkerAlt} />
                    </Box>
                    {selectedId === loc.id && (
                      <Box ml="4" minWidth="150">
                        <Flex
                          justify="space-between"
                          fontSize="sm"
                          color="gray.600"
                        >
                          <Text fontWeight="medium">Latitude:</Text>
                          <Text>{loc.lat.toFixed(4)}</Text>
                        </Flex>
                        <Flex
                          justify="space-between"
                          fontSize="sm"
                          color="gray.600"
                        >
                          <Text fontWeight="medium">Longitude:</Text>
                          <Text>{loc.lng.toFixed(4)}</Text>
                        </Flex>
                      </Box>
                    )}
                  </HStack>

                  <IconButton
                    aria-label="Edit"
                    icon={<ChevronRightIcon />}
                    size="md"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/location/edit/${loc.id}`);
                    }}
                  />
                </HStack>
              </Box>
            ))}
          </Stack>
        )}
      </VStack>
    </Box>
  );
};

export default LocationList;

"use client";

import { Box, Text, Button } from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";
import { LocationInfoCardProps } from "@/types/types";

export const LocationInfoCard = ({
  locationData,
  onSave,
}: LocationInfoCardProps) => {
  return (
    <Box
      p={3}
      minW="200px"
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      fontSize="sm"
      color="gray.800"
    >
      <Text
        fontWeight="semibold"
        mb={1}
        display="flex"
        alignItems="center"
        gap={1}
      >
        <HiLocationMarker size={32} color={locationData.color} />
        {locationData.name}
      </Text>

      <Text>Lat: {locationData.lat?.toFixed(5)}</Text>
      <Text mb={2}>Lng: {locationData.lng?.toFixed(5)}</Text>
      {onSave && (
        <Box display="flex" justifyContent="flex-end">
          <Button
            size="xs"
            variant="outline"
            colorScheme="blue"
            onClick={onSave}
          >
            Save Location
          </Button>
        </Box>
      )}
    </Box>
  );
};

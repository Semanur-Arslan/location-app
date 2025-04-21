"use client";
import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";
import { LocationInfoCardProps } from "@/types/types";

const LocationInfoCard: React.FC<LocationInfoCardProps> = ({
  locationData,
  onSave,
}) => {
  return (
    <Box
      p={2}
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
        whiteSpace="normal"
        wordBreak="break-word"
        color="gray"
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

export default LocationInfoCard;

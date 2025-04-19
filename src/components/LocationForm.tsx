import React from "react";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import { LocationFormProps } from "@/types/types";
import { ColorPicker } from "@/components/ColorPicker";
import { Title } from "@/components/Title";
import { TwoSideLinks } from "./TwoSideLinks";

const LocationForm: React.FC<LocationFormProps> = ({
  locationData,
  setLocationData,
  handleSaveLocation,
  handleColorChange,
  handleDeleteLocation,
}) => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      gap="4"
    >
      <Title text={locationData.name ? "Edit Location" : "Add Location"} />

      <Box
        display="flex"
        flexDirection="column"
        gap="4"
        width="100%"
        maxWidth="400px"
      >
        <Input
          placeholder="Location Name"
          value={locationData.name}
          onChange={(e) =>
            setLocationData({
              ...locationData,
              name: e.target.value,
            })
          }
          p={2}
        />

        <Box>
          <ColorPicker
            color={locationData.color ?? "gray"}
            onChange={handleColorChange}
          />
        </Box>

        <Flex gap={4} mt={4} justifyContent="flex-end">
          <Button colorScheme="teal" onClick={handleSaveLocation}>
            {locationData.name ? "Save Changes" : "Add Location"}
          </Button>
          {handleDeleteLocation && (
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleDeleteLocation}
            >
              Delete Location
            </Button>
          )}
        </Flex>
      </Box>

      <TwoSideLinks links={[{ label: "Show Location List", href: "/list" }]} />
    </Box>
  );
};

export default LocationForm;

import React from "react";
import { Box, Input, Button, Flex } from "@chakra-ui/react";
import { LocationFormProps } from "@/types/types";
import Title from "./Title";
import TwoSideLinks from "./TwoSideLinks";
import { ChromePicker } from "react-color";

const LocationForm: React.FC<LocationFormProps> = ({
  locationData,
  setLocationData,
  handleSaveLocation,
  handleColorChange,
  handleDeleteLocation,
  type,
}) => {
  return (
    <Flex
      flexDirection="column"
      gap={4}
      width={{ base: "100%", sm: "50%", md: "100%" }}
      p={4}
    >
      <Title text={type === "edit" ? "Edit Location" : "Add Location"} />

      <Flex flexDirection="column" gap={4}>
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
          <ChromePicker
            color={locationData.color}
            onChange={handleColorChange}
            styles={{ default: { picker: { width: "100%" } } }}
          />
        </Box>

        <Flex gap={4} justifyContent="flex-end">
          <Button colorScheme="teal" onClick={handleSaveLocation}>
            {type === "edit" ? "Save Changes" : "Add Location"}
          </Button>
          {type === "edit" && (
            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleDeleteLocation}
            >
              Delete Location
            </Button>
          )}
        </Flex>
      </Flex>

      <TwoSideLinks links={[{ label: "Show Location List", href: "/list" }]} />
    </Flex>
  );
};

export default LocationForm;

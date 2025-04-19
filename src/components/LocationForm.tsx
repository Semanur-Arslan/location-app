import React from "react";
import { Box, Input, Button } from "@chakra-ui/react";
import { LocationData } from "@/types/types";
import { ColorPicker } from "@/components/ColorPicker";
import { Title } from "@/components/Title";
import { ColorResult } from "react-color";
import { TwoSideLinks } from "./TwoSideLinks";

interface LocationFormProps {
  locationData: LocationData;
  setLocationData: React.Dispatch<React.SetStateAction<LocationData>>;
  handleSaveLocation: () => void;
  handleColorChange: (color: ColorResult) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({
  locationData,
  setLocationData,
  handleSaveLocation,
  handleColorChange,
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
            color={locationData.color}
            onChange={handleColorChange}
          />
        </Box>

        <Button colorScheme="teal" onClick={handleSaveLocation} mt={4}>
          {locationData.name ? "Save Changes" : "Add Location"}
        </Button>
      </Box>

      <TwoSideLinks links={[{ label: "Show Location List", href: "/list" }]} />
    </Box>
  );
};

export default LocationForm;

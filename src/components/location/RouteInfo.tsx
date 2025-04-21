import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Title from "../Title";
import LocationList from "./LocationList";
import TwoSideLinks from "../TwoSideLinks";
import { RouteInfoProps } from "@/types/types";

const RouteInfo: React.FC<RouteInfoProps> = ({
  routeLocations,
  handleMarkerClick,
}) => {
  return (
    <Flex flexDirection="column" w="100%" p={4} gap={4}>
      {routeLocations.length === 0 ? (
        <Box>
          <p>There are no saved locations</p>
          <TwoSideLinks links={[{ label: "Add New Location", href: "/" }]} />
        </Box>
      ) : (
        <Flex flexDirection="column" gap={4}>
          <Title text="Route Created" />
          <Text>
            It started from the location closest to your location and a route
            was created for the points you defined.
          </Text>
          <LocationList
            locations={routeLocations.filter((loc) => loc.id !== "my-location")}
            onLocationClick={handleMarkerClick}
          />

          <TwoSideLinks
            links={[
              { label: "Add New Location", href: "/" },
              { label: "Show Location List", href: "/list" },
            ]}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default RouteInfo;

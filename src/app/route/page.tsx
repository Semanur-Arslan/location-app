"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";
import { Box } from "@chakra-ui/react";
import { MapComponent } from "@/components/Map";
import { Title } from "@/components/Title";

const RoutePage = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <Box display="flex">
      <Box flex="3">
        <MapComponent
          center={
            locations.length > 0
              ? { lat: locations[0].lat, lng: locations[0].lng }
              : { lat: 39.92, lng: 32.85 }
          }
          markers={locations}
          selectedId={selectedId}
          onMarkerClick={(marker) => setSelectedId(marker.id ?? null)}
        />
      </Box>

      <Box flex="1" p={4}>
        {!locations ? (
          <Box mt={4}>
            <p>There are no saved locations</p>
          </Box>
        ) : (
          <>
            <Box
              minHeight="100vh"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap="4"
            >
              <Title text="Location List" />

              <Box
                display="flex"
                flexDirection="column"
                gap="4"
                width="100%"
                maxWidth="400px"
              >
                test
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
export default RoutePage;

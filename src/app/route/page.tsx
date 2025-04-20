"use client";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { RootState } from "@/types/redux";
import { Box, Text, Flex } from "@chakra-ui/react";
import { MapComponent } from "@/components/Map";
import { Title } from "@/components/Title";
import { toast } from "react-toastify";
import { TwoSideLinks } from "@/components/TwoSideLinks";
import { useGeolocation } from "@/hooks/useGeolocation";
import { sortLocationsByDistance } from "@/utils/sortLocationsByDistance";
import LocationList from "@/components/LocationList";

const RoutePage = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const userLocation = useGeolocation();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [googleReady, setGoogleReady] = useState(false);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [locationsWithUserLocation, setLocationsWithUserLocation] =
    useState(locations);

  useEffect(() => {
    if (userLocation && locations.length > 0) {
      const sortedLocations = sortLocationsByDistance(locations, userLocation);

      const userMarker = {
        id: "my-location",
        name: "My Location",
        lat: userLocation.lat,
        lng: userLocation.lng,
        color: "gray",
      };

      setLocationsWithUserLocation([...sortedLocations, userMarker]);
    }
  }, [userLocation, locations]);

  useEffect(() => {
    if (googleReady && locationsWithUserLocation.length > 1 && userLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      const sorted = locationsWithUserLocation.filter(
        (loc) => loc.id !== "my-location"
      );

      const request: google.maps.DirectionsRequest = {
        origin: userLocation,
        destination: {
          lat: sorted[sorted.length - 1].lat,
          lng: sorted[sorted.length - 1].lng,
        },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: sorted.slice(0, -1).map((marker) => ({
          location: { lat: marker.lat, lng: marker.lng },
          stopover: true,
        })),
        optimizeWaypoints: false,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          toast.error("Route request failed");
          console.error("Route request failed: " + status);
        }
      });
    }
  }, [googleReady, locationsWithUserLocation, userLocation]);

  const handleGoogleReady = useCallback(() => {
    setGoogleReady(true);
  }, []);

  const handleMarkerClick = (id: string) => {
    setSelectedId(id);
  };

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Box
        flex={{ base: "none", md: 3 }}
        w="100%"
        h={{ base: "50vh", md: "100vh" }}
        minH="350px"
      >
        {userLocation && (
          <MapComponent
            center={userLocation}
            markers={locationsWithUserLocation}
            selectedId={selectedId}
            onMarkerClick={(marker) => setSelectedId(marker.id ?? null)}
            directions={directions}
            onGoogleReady={handleGoogleReady}
            userLocation={userLocation}
          />
        )}
      </Box>

      <Box w="100%" maxW="300px" mx="auto" p={4}>
        {locations.length === 0 ? (
          <Box mt={4}>
            <p>There are no saved locations</p>
            <TwoSideLinks links={[{ label: "Add New Location", href: "/" }]} />
          </Box>
        ) : (
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            gap="4"
          >
            <Title text="Route Created" />
            <Text>
              It started from the location closest to your location and a route
              was created for the points you defined.
            </Text>
            <LocationList
              locations={locationsWithUserLocation.filter(
                (loc) => loc.id !== "my-location"
              )}
              onLocationClick={handleMarkerClick}
            />

            <TwoSideLinks
              links={[
                { label: "Add New Location", href: "/" },
                { label: "Show Location List", href: "/list" },
              ]}
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default RoutePage;

"use client";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";
import { Box, Text, Flex } from "@chakra-ui/react";
import { MapComponent } from "@/components/Map";
import { Title } from "@/components/Title";
import { toast } from "react-toastify";
import { LatLngLiteral } from "@/types/types";
import { TwoSideLinks } from "@/components/TwoSideLinks";

const RoutePage = () => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const [locationsWithUserLocation, setLocationsWithUserLocation] =
    useState(locations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [googleReady, setGoogleReady] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        toast.error(
          "Location information could not be obtained. Please enable location permissions."
        );
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const userMarker = {
        id: "my-location",
        name: "My Location",
        lat: userLocation.lat,
        lng: userLocation.lng,
        color: "gray",
      };

      const filteredLocations = locations.filter(
        (loc) => loc.id !== userMarker.id
      );
      setLocationsWithUserLocation([...filteredLocations, userMarker]);
    }
  }, [userLocation, locations]);

  useEffect(() => {
    if (googleReady && locations.length > 0 && userLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      const request: google.maps.DirectionsRequest = {
        origin: userLocation,
        destination: {
          lat: locations[locations.length - 1].lat,
          lng: locations[locations.length - 1].lng,
        },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: locations.slice(0, -1).map((marker) => ({
          location: { lat: marker.lat, lng: marker.lng },
          stopover: true,
        })),
        optimizeWaypoints: true,
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
  }, [googleReady, locations, userLocation]);

  const handleGoogleReady = useCallback(() => {
    setGoogleReady(true);
  }, []);

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
              was created for the points you defined. Please make sure your
              location information is open.
            </Text>
            <Text>You can add a new location or view your location list</Text>
          </Box>
        )}
        <TwoSideLinks
          links={[
            { label: "Add New Location", href: "/" },
            { label: "Show Location List", href: "/list" },
          ]}
        />
      </Box>
    </Flex>
  );
};

export default RoutePage;

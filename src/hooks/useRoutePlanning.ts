import { useEffect, useState } from "react";
import { sortLocationsByDistance } from "@/utils/sortLocationsByDistance";
import { toast } from "react-toastify";
import { RoutePlanningProps } from "@/types/types";
import { addUserLocation } from "@/utils/addUserLocation";
import { useAppSelector } from "./useReduxTypes";
import { useMemo } from "react";

const useRoutePlanning = ({
  userLocation,
  googleReady,
}: RoutePlanningProps) => {
  const locations = useAppSelector((state) => state.location.locations);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const routeLocations = useMemo(() => {
    if (userLocation && locations.length > 0) {
      const locationsWithUser = addUserLocation(locations, userLocation);
      return sortLocationsByDistance(locationsWithUser);
    }
    return locations;
  }, [userLocation, locations]);

  useEffect(() => {
    if (googleReady && routeLocations.length > 1 && userLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      const request: google.maps.DirectionsRequest = {
        origin: userLocation,
        destination: {
          lat: routeLocations.at(-1)!.lat,
          lng: routeLocations.at(-1)!.lng,
        },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: routeLocations.slice(0, -1).map((loc) => ({
          location: { lat: loc.lat, lng: loc.lng },
          stopover: true,
        })),
        optimizeWaypoints: false,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          toast.error("Route request failed");
          console.error("Route request failed:", status);
        }
      });
    }
  }, [googleReady, routeLocations, userLocation]);

  return { routeLocations, directions };
};

export default useRoutePlanning;

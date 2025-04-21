import { useEffect, useState } from "react";
import { sortLocationsByDistance } from "@/utils/sortLocationsByDistance";
import { toast } from "react-toastify";
import { Location } from "@/types/redux";
import { RoutePlanningProps } from "@/types/types";
import { RootState } from "@/types/redux";
import { useSelector } from "react-redux";
import { addUserLocation } from "@/utils/addUserLocation";

const useRoutePlanning = ({
  userLocation,
  googleReady,
}: RoutePlanningProps) => {
  const locations = useSelector((state: RootState) => state.location.locations);
  const [routeLocations, setRouteLocations] = useState<Location[]>(locations);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (userLocation && locations.length > 0) {
      const locationsWithUser = addUserLocation(locations, userLocation);
      const sorted = sortLocationsByDistance(locationsWithUser);
      setRouteLocations(sorted);
    }
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

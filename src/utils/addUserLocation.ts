import { Location } from "@/types/redux";
import { LatLngLiteral } from "@/types/types";

export const addUserLocation = (
  locations: Location[],
  userLocation: LatLngLiteral
): Location[] => {
  const userMarker: Location = {
    id: "user-location",
    name: "My Location",
    lat: userLocation.lat,
    lng: userLocation.lng,
    color: "gray",
  };

  return [userMarker, ...locations];
};

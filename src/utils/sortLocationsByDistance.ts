import { calculateDistance } from "./calculateDistance";
import { LatLngLiteral } from "@/types/types";
import { Location } from "@/types/redux";

export const sortLocationsByDistance = (
  locations: Location[],
  userLocation: LatLngLiteral
) => {
  return [...locations].sort((a, b) => {
    const distA = calculateDistance(userLocation, { lat: a.lat, lng: a.lng });
    const distB = calculateDistance(userLocation, { lat: b.lat, lng: b.lng });
    return distA - distB;
  });
};

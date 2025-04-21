import { calculateDistance } from "./calculateDistance";
import { Location } from "@/types/redux";

export const sortLocationsByDistance = (locations: Location[]) => {
  const userLocation = locations.find((loc) => loc.id === "user-location");

  if (!userLocation) {
    return locations;
  }

  return [...locations].sort((a, b) => {
    if (a.id === "user-location") return -1;
    if (b.id === "user-location") return 1;

    const distA = calculateDistance(userLocation, { lat: a.lat, lng: a.lng });
    const distB = calculateDistance(userLocation, { lat: b.lat, lng: b.lng });
    return distA - distB;
  });
};

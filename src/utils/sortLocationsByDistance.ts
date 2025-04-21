import { calculateDistance } from "./calculateDistance";
import { Location } from "@/types/redux";

export const sortLocationsByDistance = (locations: Location[]) => {
  const [userLocation, ...rest] = locations;

  return [
    userLocation,
    ...rest.sort((a, b) => {
      const distA = calculateDistance(userLocation, { lat: a.lat, lng: a.lng });
      const distB = calculateDistance(userLocation, { lat: b.lat, lng: b.lng });
      return distA - distB;
    }),
  ];
};

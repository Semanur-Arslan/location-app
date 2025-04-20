import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { LatLngLiteral } from "@/types/types";

export const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState<LatLngLiteral>({
    lat: 41.0082,
    lng: 28.9784,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
        () =>
          toast.info(
            "You can enable location permissions for accurate location information."
          )
      );
    } else {
      toast.error("Geolocation API is not supported.");
    }
  }, []);

  return userLocation;
};

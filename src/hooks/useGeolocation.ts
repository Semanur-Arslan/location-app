import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { LatLngLiteral } from "@/types/types";

const useGeolocation = () => {
  const [userLocation, setUserLocation] = useState<LatLngLiteral>({
    lat: 41.0082,
    lng: 28.9784,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        setUserLocation({ lat: coords.latitude, lng: coords.longitude })
      );
    } else {
      toast.error("Geolocation API is not supported.");
    }
  }, []);

  return userLocation;
};

export default useGeolocation;

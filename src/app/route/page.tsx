"use client";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { RootState } from "@/types/redux";
import MapComponent from "@/components/Map";
import { toast } from "react-toastify";
import useGeolocation from "@/hooks/useGeolocation";
import { sortLocationsByDistance } from "@/utils/sortLocationsByDistance";
import MapFormLayout from "@/components/layout/MapFormLayout";
import RouteInfo from "@/components/RouteInfo";

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
    <MapFormLayout
      map={
        userLocation && (
          <MapComponent
            center={userLocation}
            markers={locationsWithUserLocation}
            selectedId={selectedId}
            onMarkerClick={(marker) => setSelectedId(marker.id ?? null)}
            directions={directions}
            onGoogleReady={handleGoogleReady}
            userLocation={userLocation}
          />
        )
      }
      form={
        <RouteInfo
          locationsWithUserLocation={locationsWithUserLocation}
          handleMarkerClick={handleMarkerClick}
        />
      }
    />
  );
};
export default RoutePage;

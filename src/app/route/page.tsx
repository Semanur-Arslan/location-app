"use client";

import { useState, useCallback } from "react";

import MapComponent from "@/components/Map";
import useGeolocation from "@/hooks/useGeolocation";
import MapFormLayout from "@/components/layout/MapFormLayout";
import RouteInfo from "@/components/location/RouteInfo";
import useRoutePlanning from "@/hooks/useRoutePlanning";

const RoutePage = () => {
  const userLocation = useGeolocation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [googleReady, setGoogleReady] = useState(false);

  const { routeLocations, directions } = useRoutePlanning({
    userLocation,
    googleReady,
  });

  const handleGoogleReady = useCallback(() => setGoogleReady(true), []);
  const handleMarkerClick = (id: string) => setSelectedId(id);

  return (
    <MapFormLayout
      map={
        userLocation && (
          <MapComponent
            mode="list"
            center={userLocation}
            routeLocations={routeLocations}
            selectedId={selectedId}
            onSelectMarker={(marker) => setSelectedId(marker.id ?? null)}
            directions={directions}
            onGoogleReady={handleGoogleReady}
            userLocation={userLocation}
          />
        )
      }
      form={
        <RouteInfo
          routeLocations={routeLocations}
          handleMarkerClick={handleMarkerClick}
        />
      }
    />
  );
};
export default RoutePage;

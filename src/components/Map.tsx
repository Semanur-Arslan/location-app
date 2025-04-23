"use client";
import React, { useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MapComponentProps } from "@/types/types";
import useMapStyles from "@/hooks/useMapStyles";
import LocationMarker from "./markers/LocationMarker";
import RouteMarker from "./markers/RouteMarker";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const MapComponent: React.FC<MapComponentProps> = (props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
  });

  const mapStyles = useMapStyles();

  const { mode, onGoogleReady } = props;
  useEffect(() => {
    if (isLoaded && mode === "list") {
      onGoogleReady?.();
    }
  }, [isLoaded, mode, onGoogleReady]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={props.center}
      zoom={13}
      onClick={props.onMapClick}
      options={{
        styles: mapStyles,
      }}
    >
      {props.mode === "add" && (
        <LocationMarker
          key={`${props.locationData.lat}-${props.locationData.lng}`}
          locationData={props.locationData}
          showInfo={props.showInfo}
          onCloseInfo={props.onCloseInfo}
          onSave={props.onSave}
        />
      )}

      {props.mode === "list" &&
        props.routeLocations.map((routeLocation) => {
          const isSelected = routeLocation.id === props.selectedId;
          return (
            <RouteMarker
              key={
                routeLocation.id || `${routeLocation.lat}-${routeLocation.lng}`
              }
              routeLocation={routeLocation}
              isSelected={isSelected}
              onRouteMarkerClick={props.onSelectMarker}
            />
          );
        })}

      {props.mode === "list" && props.directions && (
        <DirectionsRenderer
          directions={props.directions}
          options={{
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: {
              strokeColor: "#5EEAD3",
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapComponent;

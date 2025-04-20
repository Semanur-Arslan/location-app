"use client";
import React, { useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { LocationInfoCard } from "@/components/LocationInfoCard";
import { MapComponentProps } from "@/types/types";
import { getColoredMarkerIcon } from "@/utils/markerUtils";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export const MapComponent: React.FC<MapComponentProps> = ({
  center,
  locationData,
  showInfo = false,
  onMapClick,
  onCloseInfo,
  onSave,
  markers = [],
  onMarkerClick,
  selectedId,
  directions,
  onGoogleReady,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
  });

  useEffect(() => {
    if (isLoaded) {
      onGoogleReady?.();
    }
  }, [isLoaded, onGoogleReady]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={13}
      onClick={onMapClick}
    >
      {locationData?.lat && locationData?.lng && (
        <Marker position={{ lat: locationData.lat, lng: locationData.lng }}>
          {showInfo && (
            <InfoWindow
              position={{ lat: locationData.lat, lng: locationData.lng }}
              onCloseClick={onCloseInfo}
            >
              <LocationInfoCard locationData={locationData} onSave={onSave} />
            </InfoWindow>
          )}
        </Marker>
      )}

      {markers.map((marker) => {
        const isSelected = marker.id === selectedId;
        const icon = getColoredMarkerIcon(marker.color || "#FF0000");

        return (
          <Marker
            key={marker.id || `${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={icon}
            onClick={() => onMarkerClick?.(marker)}
          >
            {isSelected && marker.name && (
              <InfoWindow
                position={{ lat: marker.lat, lng: marker.lng }}
                onCloseClick={() => onMarkerClick?.({ ...marker, id: null })}
              >
                <LocationInfoCard locationData={marker} />
              </InfoWindow>
            )}
          </Marker>
        );
      })}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            preserveViewport: true,
          }}
        />
      )}
    </GoogleMap>
  );
};

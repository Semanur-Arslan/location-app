"use client";
import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { LocationInfoCard } from "@/components/LocationInfoCard";
import { LocationData } from "@/types/types";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

type MarkerType = {
  id?: string;
  lat: number;
  lng: number;
  name?: string;
  color?: string;
};

type MapComponentProps = {
  center: { lat: number; lng: number };
  //add location
  locationData?: LocationData;
  showInfo?: boolean;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  onCloseInfo?: () => void;
  onSave?: () => void;
  //list locations
  markers?: MarkerType[];
  onMarkerClick?: (marker: MarkerType) => void;
};

export const MapComponent: React.FC<MapComponentProps> = ({
  center,
  locationData,
  showInfo = false,
  onMapClick,
  onCloseInfo,
  onSave,
  markers = [],
  onMarkerClick,
}) => {
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100vh" }}
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

        {markers.map((marker) => (
          <Marker
            key={marker.id || `${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: marker.color || "#ff0000",
              fillOpacity: 1,
              strokeWeight: 1,
            }}
            onClick={() => onMarkerClick?.(marker)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

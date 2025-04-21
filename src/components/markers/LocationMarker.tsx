import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import LocationInfoCard from "../location/LocationInfoCard";
import { LocationMarkerProps } from "@/types/types";

const LocationMarker: React.FC<LocationMarkerProps> = ({
  locationData,
  showInfo,
  onCloseInfo,
  onSave,
}) => {
  if (!locationData?.lat || !locationData?.lng) return null;

  return (
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
  );
};

export default LocationMarker;

import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { getColoredMarkerIcon } from "@/utils/markerUtils";
import LocationInfoCard from "../location/LocationInfoCard";
import { RouteMarkerProps } from "@/types/types";

const RouteMarker: React.FC<RouteMarkerProps> = ({
  routeLocation,
  isSelected,
  onRouteMarkerClick,
}) => {
  const icon = getColoredMarkerIcon(routeLocation.color || "#FF0000");

  return (
    <Marker
      position={{ lat: routeLocation.lat, lng: routeLocation.lng }}
      icon={icon}
      onClick={() => onRouteMarkerClick?.(routeLocation)}
    >
      {isSelected && routeLocation.name && (
        <InfoWindow
          position={{ lat: routeLocation.lat, lng: routeLocation.lng }}
          onCloseClick={() => onRouteMarkerClick?.(routeLocation)}
        >
          <LocationInfoCard locationData={routeLocation} />
        </InfoWindow>
      )}
    </Marker>
  );
};

export default RouteMarker;

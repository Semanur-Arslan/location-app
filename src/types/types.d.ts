import { ReactNode } from "react";
import { ColorResult } from "react-color";

// === Map Events ===
export type MapClickEvent = google.maps.MapMouseEvent;
export interface LatLngLiteral {
  lat: number;
  lng: number;
}

// === Location ===
export interface LocationData {
  id?: string;
  lat: number | null;
  lng: number | null;
  name: string;
  color: string;
}
export interface MarkerType {
  id: string;
  lat: number;
  lng: number;
  name?: string;
  color?: string;
}

// === Location Form ===
export interface LocationFormProps {
  locationData: LocationData;
  setLocationData: React.Dispatch<React.SetStateAction<LocationData>>;
  handleSaveLocation: () => void;
  handleColorChange: (color: ColorResult) => void;
  handleDeleteLocation?: () => void;
  type: "add" | "edit";
}
export interface LocationInfoCardProps {
  locationData: LocationData | MarkerType;
  onSave?: () => void;
}

// === Location List ===
export interface Location {
  id: string;
  name: string;
}
export interface LocationListProps {
  locations: Location[];
  onLocationClick: (id: string) => void;
}

// === Route Info ===
export interface RouteInfoProps {
  locationsWithUserLocation: Location[];
  handleMarkerClick: (id: string) => void;
}

// === Form Layout ===
export interface MapFormLayoutProps {
  map: ReactNode;
  form: ReactNode;
}

// === Map Component ===
export interface MapComponentProps {
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
  selectedId?: string | null;
  directions?: google.maps.DirectionsResult | null;
  onGoogleReady?: () => void;
  userLocation?: google.maps.LatLngLiteral;
}

// === Links ===
export interface LinkData {
  label: string;
  href: string;
}
export interface TwoSideLinksProps {
  links: LinkData[];
}

// === Actions ===
export type AddLocationHandler = (
  locationData: LocationData,
  resetForm?: () => void
) => void;

export type EditLocationHandler = (
  id: string,
  locationData: LocationData
) => void;

export type DeleteLocationHandler = (id: string, redirect?: () => void) => void;

// === Errors ===
export type ValidationErrors = {
  fields?: string;
  location?: string;
  id?: string;
};

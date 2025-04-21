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
export interface RouteLocation {
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
  routeLocations: Location[];
  handleMarkerClick: (id: string) => void;
}

// === Form Layout ===
export interface MapFormLayoutProps {
  map: ReactNode;
  form: ReactNode;
}

// === Map Component ===
interface MapBaseProps {
  center: { lat: number; lng: number };
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
}
interface AddLocationProps extends MapBaseProps {
  mode: "add";
  locationData: LocationData;
  showInfo: boolean;
  onCloseInfo: () => void;
  onSave: () => void;
}
interface ListRouteProps extends MapBaseProps {
  mode: "list";
  routeLocations: RouteLocation[];
  onSelectMarker: (routeLocation: RouteLocation) => void;
  selectedId: string | null;
  directions: google.maps.DirectionsResult | null;
  userLocation?: google.maps.LatLngLiteral;
  onGoogleReady: () => void;
}
export type MapComponentProps = AddLocationProps | ListRouteProps;

// === Markers ===
export interface LocationMarkerProps {
  locationData: LocationData;
  showInfo: boolean;
  onCloseInfo: () => void;
  onSave: () => void;
}
export interface RouteMarkerProps {
  routeLocation: RouteLocation;
  isSelected: boolean;
  onRouteMarkerClick: (routeLocation: RouteLocation) => void;
}

// === Links ===
export interface LinkData {
  label: string;
  href: string;
  color?: string;
}
export interface TwoSideLinksProps {
  links: LinkData[];
}

// === Title ===
export interface TitleProps {
  text: string;
  links?: LinkData[];
}

// === RoutePlanning ===
export interface RoutePlanningProps {
  userLocation: LatLngLiteral;
  googleReady: boolean;
}

// === AddUserLocationProps ===
export interface AddUserLocationProps {
  locations: Location[];
  userLocation: LatLngLiteral;
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

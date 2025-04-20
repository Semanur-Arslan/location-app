export type MapClickEvent = google.maps.MapMouseEvent;

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface LocationData {
  id?: string | null;
  lat: number | null;
  lng: number | null;
  name?: string;
  color?: string;
}

//Links Types
export interface LinkData {
  label: string;
  href: string;
}

export interface TwoSideLinksProps {
  links: LinkData[];
}

export type ValidationErrors = {
  fields?: string;
  location?: string;
};

export interface LocationFormProps {
  locationData: LocationData;
  setLocationData: React.Dispatch<React.SetStateAction<LocationData>>;
  handleSaveLocation: () => void;
  handleColorChange: (color: ColorResult) => void;
  handleDeleteLocation?: () => void;
  type: string;
}

export interface ColorPickerProps {
  color: string;
  onChange: (color: ColorResult) => void;
}

export interface LocationInfoCardProps {
  locationData: LocationData;
  onSave?: () => void;
}

export interface MarkerType {
  id?: string | null;
  lat: number;
  lng: number;
  name?: string;
  color?: string;
}

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

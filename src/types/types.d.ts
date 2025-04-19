export type MapClickEvent = google.maps.MapMouseEvent;

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface LocationData {
  id?: string | null;
  lat: number | null;
  lng: number | null;
  name: string;
  color: string;
}

export interface MapComponentProps {
  userLocation: LatLngLiteral;
  locationData: LocationData;
  handleMapClick: (e: MapClickEvent) => void;
  showInfo: boolean;
  handleCloseInfoWindow: () => void;
}

//Links Types
export interface LinkData {
  label: string;
  href: string;
}

export interface TwoSideLinksProps {
  links: LinkData[];
}

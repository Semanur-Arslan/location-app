export interface Location {
  id: string | null;
  name: string;
  lat: number;
  lng: number;
  color: string;
}

export interface RootState {
  location: LocationState;
}

export type AppDispatch = (action: Action<string>) => void;

export interface LocationState {
  locations: Location[];
}

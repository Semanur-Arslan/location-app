import { store } from "@/store/index";

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
}

export interface LocationState {
  locations: Location[];
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

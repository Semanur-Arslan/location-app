import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location, LocationState } from "@/types/redux";

const initialState: LocationState = {
  locations: [],
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload);
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      const index = state.locations.findIndex(
        (loc) => loc.id === action.payload.id
      );
      if (index !== -1) state.locations[index] = action.payload;
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (loc) => loc.id !== action.payload
      );
    },
  },
});

export const { addLocation, updateLocation, removeLocation } =
  locationSlice.actions;

export default locationSlice.reducer;

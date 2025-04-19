import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import { RootState, AppDispatch } from "@/types/redux";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

export type { RootState, AppDispatch };
export default store;

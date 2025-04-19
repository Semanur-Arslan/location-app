import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["location"],
};

const rootReducer = combineReducers({
  location: locationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

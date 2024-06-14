import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { autosReducer } from "./auto/autosSlice";

const persistConfig = {
  key: "autos",
  version: 1,
  storage,
  whitelist: ["catalog", "favorites"],
};

export const store = configureStore({
  reducer: {
    autos: persistReducer(persistConfig, autosReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

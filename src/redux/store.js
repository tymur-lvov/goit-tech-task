import { configureStore } from "@reduxjs/toolkit";

import { autosReducer } from "./auto/autosSlice";

export const store = configureStore({
  reducer: {
    autos: autosReducer,
  },
});

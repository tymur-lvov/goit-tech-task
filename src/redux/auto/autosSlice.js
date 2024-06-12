import { createSlice } from "@reduxjs/toolkit";

import { fetchCatalogThunk } from "./autosOperations";

const initialState = {
  catalog: [],
  favorites: [],
  isLoading: false,
  isError: null,
};

const autosSlice = createSlice({
  name: "autos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogThunk.fulfilled, (state, { payload }) => {
      state.catalog = payload;
    });
  },
});

export const autosReducer = autosSlice.reducer;

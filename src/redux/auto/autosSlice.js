import { createSlice } from "@reduxjs/toolkit";

import { fetchCatalogThunk, fetchMoreAutosThunk } from "./autosOperations";
import toast from "react-hot-toast";

const initialState = {
  catalog: [],
  favorites: [],
  isLimit: false,
  isLoading: false,
  isError: null,
};

const autosSlice = createSlice({
  name: "autos",
  initialState,
  reducers: {
    addToFavorites: (state, { payload }) => {
      const autoToAdd = state.catalog.find((auto) => auto.id === payload);
      state.favorites.push(autoToAdd);
    },
    removeFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter((auto) => auto.id !== payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogThunk.fulfilled, (state, { payload }) => {
        state.isLimit = false;
        state.catalog = payload;
      })
      .addCase(fetchMoreAutosThunk.fulfilled, (state, { payload }) => {
        if (payload.length === 0) {
          state.isLimit = true;
          toast("Sorry, that's all we got!", {
            icon: "🤷‍♂️",
          });
        }
        state.catalog = [...state.catalog, ...payload];
      });
  },
});

export const { addToFavorites, removeFromFavorites } = autosSlice.actions;
export const autosReducer = autosSlice.reducer;

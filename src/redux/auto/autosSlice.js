import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAutosByBrandThunk,
  fetchAutosByPriceThunk,
  fetchCatalogThunk,
  fetchMoreAutosThunk,
} from "./autosOperations";

const initialState = {
  catalog: [],
  favorites: [],
  refCatalog: [],
  value: "",
  isLimit: false,
  isLoading: false,
  isError: null,
};

const autosSlice = createSlice({
  name: "autos",
  initialState,
  reducers: {
    saveValue: (state, { payload }) => {
      state.value = payload;
    },
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
        state.isLoading = false;
        state.catalog = payload;
        state.refCatalog = payload;
      })
      .addCase(fetchCatalogThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreAutosThunk.fulfilled, (state, { payload }) => {
        if (payload.length === 0) {
          state.isLimit = true;
          toast("Sorry, that's all we got!", {
            icon: "🤷‍♂️",
          });
        }
        state.catalog = [...state.catalog, ...payload];
      })
      .addCase(fetchAutosByBrandThunk.fulfilled, (state, { payload }) => {
        state.catalog = payload;
      })
      .addCase(fetchAutosByPriceThunk.fulfilled, (state, { payload }) => {
        state.catalog = payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites, saveValue } =
  autosSlice.actions;
export const autosReducer = autosSlice.reducer;

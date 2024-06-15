import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAutosByIdThunk,
  fetchAutosByQueryThunk,
  fetchCatalogThunk,
  fetchMoreAutosThunk,
  fetchRefCatalogThunk,
} from "./autosOperations";

const initialState = {
  catalog: [],
  refCatalog: [],
  catalogCount: 0,
  favorites: [],
  auto: null,
  value: "",
  isLimit: false,
  isLoading: false,
  isError: null,
};

const autosSlice = createSlice({
  name: "autos",
  initialState,
  reducers: {
    increaseCatalogCount: (state, { payload }) => {
      state.catalogCount += payload;
    },
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
      .addCase(fetchRefCatalogThunk.fulfilled, (state, { payload }) => {
        state.refCatalog = payload;
      })
      .addCase(fetchCatalogThunk.fulfilled, (state, { payload }) => {
        state.isLimit = false;
        state.isLoading = false;
        state.catalog = payload;
      })
      .addCase(fetchCatalogThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreAutosThunk.fulfilled, (state, { payload }) => {
        if (
          payload.length === 0 ||
          state.catalogCount === state.refCatalog.length
        ) {
          state.isLimit = true;
          toast("Sorry, that's all we got!", {
            icon: "🤷‍♂️",
          });
        }
        state.catalog = [...state.catalog, ...payload];
      })
      .addCase(fetchAutosByIdThunk.fulfilled, (state, { payload }) => {
        const [auto] = payload;
        state.auto = auto;
      })
      .addCase(fetchAutosByQueryThunk.fulfilled, (state, { payload }) => {
        payload.length < 12 || payload.length > 12
          ? (state.isLimit = true)
          : null;
        state.catalog = payload;
      })
      .addCase(fetchAutosByQueryThunk.rejected, () => {
        toast("Sorry, no matches... Try again!", {
          icon: "🤷‍♂️",
        });
      });
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  saveValue,
  increaseCatalogCount,
} = autosSlice.actions;
export const autosReducer = autosSlice.reducer;

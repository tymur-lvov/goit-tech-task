import toast from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAutosByIdThunk,
  fetchAutosByQueryThunk,
  fetchCatalogThunk,
  fetchMoreAutosThunk,
} from "./autosOperations";

const initialState = {
  catalog: [],
  refCatalog: [],
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
      .addCase(fetchAutosByIdThunk.fulfilled, (state, { payload }) => {
        const [auto] = payload;
        state.auto = auto;
      })
      .addCase(fetchAutosByQueryThunk.fulfilled, (state, { payload }) => {
        state.catalog = payload;
      })
      .addCase(fetchAutosByQueryThunk.rejected, () => {
        toast("Sorry, no matches... Try again!", {
          icon: "🤷‍♂️",
        });
      });
  },
});

export const { addToFavorites, removeFromFavorites, saveValue } =
  autosSlice.actions;
export const autosReducer = autosSlice.reducer;

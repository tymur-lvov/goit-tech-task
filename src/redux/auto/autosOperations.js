import { createAsyncThunk } from "@reduxjs/toolkit";

import { mockApi } from "../../services/mockApi";

export const fetchCatalogThunk = createAsyncThunk(
  "autos/fetchCatalog",
  async (_, thunkApi) => {
    try {
      const { data } = await mockApi.get("advert/", {
        params: {
          page: 1,
          limit: 12,
        },
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchMoreAutosThunk = createAsyncThunk(
  "autos/fetchMoreAutos",
  async (page, thunkApi) => {
    try {
      const { data } = await mockApi.get("advert/", {
        params: {
          page,
          limit: 12,
        },
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

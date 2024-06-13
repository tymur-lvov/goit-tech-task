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

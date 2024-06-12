import { createAsyncThunk } from "@reduxjs/toolkit";

import { mockApi } from "../../services/mockApi";

export const fetchCatalogThunk = createAsyncThunk(
  "autos/fetchCatalog",
  async (_, thunkApi) => {
    try {
      const { data } = await mockApi.get("advert");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

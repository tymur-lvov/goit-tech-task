import { createAsyncThunk } from "@reduxjs/toolkit";

import { mockApi } from "../../services/mockApi";

export const fetchRefCatalogThunk = createAsyncThunk(
  "autos/fetchRefCatalog",
  async (_, thunkApi) => {
    try {
      const { data } = await mockApi.get("advert/");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
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

export const fetchAutosByIdThunk = createAsyncThunk(
  "autos/fetchAutosByIdThunk",
  async (id, thunkApi) => {
    try {
      const { data } = await mockApi.get("advert/", {
        params: {
          id,
        },
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchAutosByQueryThunk = createAsyncThunk(
  "autos/fetchAutosByQuery",
  async (params, thunkApi) => {
    try {
      const { data } = await mockApi.get("advert/", {
        params: {
          make: params.make,
          rentalPrice: params.rentalPrice,
        },
      });
      if (params.from || params.to) {
        const filteredData = data.filter(
          (auto) => auto.mileage <= params.to && auto.mileage >= params.from
        );
        return filteredData;
      }
      if (params.rentalPrice) {
        return data.filter(
          (auto) =>
            +auto.rentalPrice.slice(1, auto.rentalPrice.length) <=
            +params.rentalPrice
        );
      }
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

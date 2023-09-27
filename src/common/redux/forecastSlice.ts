import {
  AnyAction,
  PayloadAction,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { forecastQueries } from "../api/weatherQueries";
import { HYDRATE } from "next-redux-wrapper";
import { TForecastData } from "../types/openweather-forecast";
import { AppState } from "./store";

type TStoreState = {
  forecast: TForecastData;
};

const initialState: TStoreState = {
  forecast: {} as TForecastData,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state: TStoreState, action: AnyAction) => {
      const dynamicKey = Object.keys(action.payload.api.queries)[0];
      const hackySSR = action.payload.api.queries[dynamicKey];
      if (hackySSR.error) {
        throw new Error(
          JSON.stringify({
            status: hackySSR.error.status,
            message: hackySSR.error.data.message,
          })
        );
      }

      state.forecast = hackySSR.data;
    });
    builder.addMatcher(
      forecastQueries.endpoints.getLatestForecastData.matchFulfilled,
      (state: TStoreState, action: PayloadAction<TForecastData>) => {
        const { payload } = action;
        state.forecast = payload;
      }
    );
    builder.addMatcher(
      forecastQueries.endpoints.getForecastForPreviousDay.matchFulfilled,
      (state: TStoreState, action: PayloadAction<TForecastData>) => {
        const { payload } = action;
        if ("cod" in payload) return { ...state };
        state.forecast.hourly = [...payload.hourly, ...state.forecast.hourly];
      }
    );
  },
});

export default weatherSlice.reducer;

const currentForecast = (state: AppState) => state.weather.forecast;

export const getCurrentForecastWithTZOffset = createSelector(
  [currentForecast],
  (state) => {
    return {
      current: state.current,
      daily: state.daily,
      offset: state.timezone_offset,
    };
  }
);

export const getHourlyForecastWithTZOffset = createSelector(
  [currentForecast],
  (state) => {
    return {
      location: {
        lat: state.lat,
        lon: state.lon,
      },
      hourly: state.hourly,
      offset: state.timezone_offset,
    };
  }
);

import { createSelector, createSlice } from "@reduxjs/toolkit";
import { forecastQueries } from "../api/weatherQueries";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  forecast: {},
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state: any, action: any) => {
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

      state.forecast = hackySSR.data.data;
    });
    builder.addMatcher(
      forecastQueries.endpoints.getLatestForecastData.matchFulfilled,
      (state, action) => {
        const { payload } = action;
        state.forecast = payload.data;
      }
    );
    builder.addMatcher(
      forecastQueries.endpoints.getForecastForPreviousDay.matchFulfilled,
      (state, action) => {
        const { payload } = action;
        (state.forecast as any).hourly = [
          ...payload.hourly,
          ...(state.forecast as any).hourly,
        ];
      }
    );
  },
});

export default weatherSlice.reducer;

const currentLocale = (state: any) => state.weather.forecast;

export const getCurrentForecastWithTZOffset = createSelector(
  [currentLocale],
  (state) => {
    return {
      current: state.current,
      daily: state.daily,
      offset: state.timezone_offset,
    };
  }
);

export const getHourlyForecastWithTZOffset = (state: any) => {
  return {
    location: {
      lat: state.weather.forecast.lat,
      lon: state.weather.forecast.lon,
    },
    hourly: state.weather.forecast?.hourly,
    offset: state.weather.forecast?.timezone_offset,
  };
};

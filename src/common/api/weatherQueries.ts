import { apiSlice } from "./apiSlice";
export const forecastQueries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestForecastData: builder.query({
      query: (city) => ({
        url: `/api/${city}/get-weather`,
      }),
      providesTags: ["forecast"],
    }),
    addMetricsData: builder.mutation({
      query: (metrics) => ({
        url: "/api/metrics/add",
        method: "POST",
        body: { ...metrics },
      }),
    }),
  }),
});

export const { useGetLatestForecastDataQuery, useAddMetricsDataMutation } =
  forecastQueries;

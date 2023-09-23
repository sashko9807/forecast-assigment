import { apiSlice } from "./apiSlice";
export const forecastQueries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestForecastData: builder.query({
      query: (city) => ({
        url: `/api/${city}/get-weather`,
      }),
      providesTags: ["forecast"],
    }),
    getForecastForPreviousDay: builder.query({
      query: ({ location, dt }) => ({
        url: `/api/get-forecast-history?lat=${location.lat}&lon=${location.lon}&date=${dt}`,
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

export const {
  useGetLatestForecastDataQuery,
  useLazyGetForecastForPreviousDayQuery,
  useAddMetricsDataMutation,
} = forecastQueries;

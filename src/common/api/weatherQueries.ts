import { apiSlice } from "./apiSlice";
;
export const forecastQueries = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestForecastData: builder.query({
      query: (city) => ({
        url: `/api/${city}/get-weather`
      }),
      providesTags: ['forecast'],
    })
  }),
});

export const {
    useGetLatestForecastDataQuery
} = forecastQueries
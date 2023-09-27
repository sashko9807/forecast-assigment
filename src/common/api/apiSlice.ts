import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
});

export const apiSlice = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);
    if (!response) throw new Error("Oops something went wrong.");
    return response;
  },
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["forecast"],
  endpoints: (builder) => ({}),
});

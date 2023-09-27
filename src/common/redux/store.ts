import { configureStore } from "@reduxjs/toolkit/";
import { apiSlice } from "@/common/api/apiSlice";
import { weatherSlice } from "./forecastSlice";
import { createWrapper } from "next-redux-wrapper";

const store = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      weather: weatherSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });

type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export const storeWrapper = createWrapper(store);

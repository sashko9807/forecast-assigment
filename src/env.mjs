import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    GOOGLE_MAPS_API_KEY: z.string().min(1),
    OPEN_WEATHER_API_KEY: z.string().nonempty().min(1),
    OPEN_WEATHER_STATION_ID: z.string().min(1),
  },
  runtimeEnv: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    OPEN_WEATHER_STATION_ID: process.env.OPEN_WEATHER_STATION_ID,
  },
});

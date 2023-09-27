// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getLatestForecastInfo } from "@/common/utils/openWeatherRequests";
import { getCoordsFromCityName } from "@/common/utils/googleMapsApiRequest";
import { env } from "@/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cityCoords = await getCoordsFromCityName(
    req.query.city as string,
    env.GOOGLE_MAPS_API_KEY
  );

  if ("error_message" in cityCoords) return;

  const forecast = await getLatestForecastInfo(
    cityCoords,
    env.OPEN_WEATHER_API_KEY
  );
  if ("cod" in forecast) {
    res.status(forecast.cod).json({ message: forecast.message });
    return;
  }
  res.status(200).json(forecast);
}

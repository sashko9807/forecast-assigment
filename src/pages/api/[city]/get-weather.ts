// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  GetCoordsFromCityName,
  openWeatherRequestBuilder,
} from "@/common/utils/openWeatherRequestBuilder";
import { env } from "@/common/validation/envValidation";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const cityCoords = await GetCoordsFromCityName(
    req.query.city as string,
    env.GOOGLE_MAPS_API_KEY,
  );
  const forecast = await openWeatherRequestBuilder(
    cityCoords,
    env.OPEN_WEATHER_API_KEY,
  );
  res.status(200).json(forecast);
}

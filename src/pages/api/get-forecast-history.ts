// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getPastForecastInfo } from "@/common/utils/openWeatherRequests";
import { env } from "@/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const apiKey = env.OPEN_WEATHER_API_KEY;
  const { lat, lon, date } = req.query as any;
  const historyForecast = await getPastForecastInfo(apiKey, lat, lon, date);
  if ("cod" in historyForecast) {
    res
      .status(historyForecast.cod)
      .json({ status: historyForecast.cod, message: historyForecast.message });
    return;
  }
  res.status(200).json(historyForecast);
}

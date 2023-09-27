// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { openWeatherHistoryRequestBuilder } from "@/common/utils/openWeatherRequestBuilder";
import { env } from "@/env.mjs";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const apiKey = env.OPEN_WEATHER_API_KEY;
  const { lat, lon, date } = req.query as any;
  const historyForecast = await openWeatherHistoryRequestBuilder(
    apiKey,
    lat,
    lon,
    date,
  );
  if (historyForecast.cod === 400) {
    res.status(400).json({ status: 400, message: historyForecast.message });
    return;
  }
  res.status(200).json(historyForecast);
}

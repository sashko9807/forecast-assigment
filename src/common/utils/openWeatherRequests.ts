import { TForecastResponse } from "../types/openweather-forecast";
import { TLocation } from "../types/maps-geocode";
import {
  TAddMeasurmentError,
  TAddMetricsReqBody,
} from "../types/openweather-metrics";

export const openWeatherImageUrl = (image: string) =>
  `https://openweathermap.org/img/wn/${image}@4x.png`;

export async function getLatestForecastInfo(
  coords: TLocation,
  apiKey: string,
  unit: string = "metric",
  language: string = "bg"
): Promise<TForecastResponse> {
  const { lat, lng } = coords;
  const forecastRequest = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${unit}&lang=${language}&appid=${apiKey}`
  );

  return await forecastRequest.json();
}

export async function getPastForecastInfo(
  apiKey: string,
  lat: string,
  lon: string,
  dateInUnix: string,
  unit: string = "metric"
): Promise<TForecastResponse> {
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dateInUnix}&units=${unit}&appid=${apiKey}`
  );

  const response = await request.json();
  return response;
}

export async function addNewMeasurementData(
  apiKey: string,
  stationId: string,
  body: TAddMetricsReqBody
): Promise<TAddMeasurmentError | Response> {
  const reqBody: TAddMetricsReqBody = {
    station_id: stationId,
    dt: Date.now(),
    username: body.username,
    email: body.email,
    temperature: body.temperature,
    wind_speed: body.wind_speed,
    humidity: body.humidity,
    pressure: body.pressure,
    rain_1h: body.rain_1h,
  };

  const reqOptions = {
    method: "POST",
    body: JSON.stringify([reqBody]),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  };

  const request = await fetch(
    `https://api.openweathermap.org/data/3.0/measurements?appid=${apiKey}`,
    reqOptions
  );

  //OpenWeather responds with status 204 on success, thus no response body to parse to JSON
  if (request.ok) return request;

  const responseErr = (await request.json()) as TAddMeasurmentError;
  return responseErr;
}

import { TForecastData } from "../types/forecast";
type TLocation = {
  lat: number;
  lng: number;
};

type TAddMetricsReqBody = {
  station_id: string;
  dt: number;
  username: string;
  email: string;
  temperature: number;
  wind_speed: number;
  humidity: number;
  pressure: number;
  rain_1h: number;
};

type TForecastError = {
  cod: number;
  message: string;
};

type TForecastResponse = TForecastError | TForecastData;

export const openWeatherImageUrl = (image: string) =>
  `https://openweathermap.org/img/wn/${image}@4x.png`;

export async function openWeatherRequestBuilder(
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

export async function openWeatherHistoryRequestBuilder(
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

type TAddMeasurmentError = {
  code: number;
  message: string;
};

export async function openWeatherAddMeasurements(
  apiKey: string,
  stationId: string,
  body: Omit<TAddMetricsReqBody, "station_id" | "dt">
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

  if (request.ok) return request;

  const response = await request.json();
  return response;
}

export async function GetCoordsFromCityName(
  city: string,
  mapsApiKey: string
): Promise<TLocation> {
  const request = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      city
    )}&key=${mapsApiKey}`
  );
  const response = await request.json();
  return response.results[0].geometry.location;
}

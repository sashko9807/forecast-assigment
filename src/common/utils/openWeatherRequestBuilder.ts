type TLocation = {
  lat: number;
  lng: number;
};

export const openWeatherImageUrl = (image: string) =>
  `https://openweathermap.org/img/wn/${image}@4x.png`;

export async function openWeatherRequestBuilder(
  coords: any,
  apiKey: any,
  unit: string = "metric"
) {
  const { lat, lng } = coords;
  const forecastRequest = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${unit}&appid=${apiKey}`
  );
  const response = await forecastRequest.json();
  return response;
}

export async function openWeatherHistoryRequestBuilder(
  apiKey: string,
  lat: string,
  lon: string,
  dateInUnix: string,
  unit: string = "metric"
) {
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dateInUnix}&units=${unit}&appid=${apiKey}`
  );

  const response = await request.json();
  return response;
}

export async function openWeatherAddMeasurements(
  apiKey: string,
  stationId: string,
  body: any
) {
  const reqBody: any = {
    station_id: stationId,
    dt: Date.now(),
    username: body.username,
    email: body.email,
    temperature: body.temperature,
    wind_speed: body.wind_speed,
    humidity: body.humidity,
    pressure: body.pressure,
    rain_1h: body.rain,
  };

  const reqOptions: any = {
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

export async function GetCoordsFromCityName(city: string, mapsApiKey: string) {
  const request = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      city
    )}&key=${mapsApiKey}`
  );
  const response = await request.json();
  return response.results[0].geometry.location as TLocation;
}

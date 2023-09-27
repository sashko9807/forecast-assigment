import { TLocation, MapsGeocodeResponse } from "../types/maps-geocode";

export async function getCoordsFromCityName(
  city: string,
  mapsApiKey: string
): Promise<TLocation | MapsGeocodeResponse> {
  const request = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      city
    )}&key=${mapsApiKey}`
  );
  const response = (await request.json()) as MapsGeocodeResponse;
  if (response.status !== "OK")
    throw new Error(
      JSON.stringify({
        status: response.status,
        message: response.error_message,
      })
    );
  return response.results[0].geometry.location;
}

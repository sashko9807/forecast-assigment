import { TLocation, MapsGeocodeResponse } from "../types/maps-geocode";

export async function getCoordsFromCityName(
  city: string,
  mapsApiKey: string
): Promise<TLocation> {
  const request = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      city
    )}&key=${mapsApiKey}`
  );
  const response = (await request.json()) as MapsGeocodeResponse;
  return response.results[0].geometry.location;
}

type TAddressComponents = Array<{
  long_name: string;
  short_name: string;
  types: Array<string>;
}>;

type TViewport = {
  northeast: TLocation;
  southwest: TLocation;
};

type TGeometry = {
  bounds: TViewport;
  viewport: TViewport;
  location: TLocation;
  location_type: string;
};

type MapsResultBody = {
  address_components: TAddressComponents;
  geometry: TGeometry;
  formatted_address: string;
  place_id: string;
  types: Array<string>;
};

export type MapsGeocodeResponse = {
  status: string;
  results: Array<MapsResultBody>;
};

export type TLocation = {
  lat: number;
  lng: number;
};

export type TAddMetricsReqBody = {
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

export type TAddMeasurmentError = {
  code: number;
  message: string;
};

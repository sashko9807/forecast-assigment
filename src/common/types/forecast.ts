type TCurrentForecast = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
};

type TMinutelyForecast = {
  dt: number;
  precipitation: number;
};

type THourlyForecast = Omit<TCurrentForecast, "sunrise" | "sunset"> & {
  pop: number;
};

type TDailyForecast = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: number;
  pop: number;
  uvi: number;
};

export type TForecastData = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: TCurrentForecast;
  minutely: Array<TMinutelyForecast>;
  hourly: Array<THourlyForecast>;
  daily: Array<TDailyForecast>;
};

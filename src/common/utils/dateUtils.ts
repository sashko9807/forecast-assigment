type TWeekAndDate = {
  weekday: string;
  date: string;
};

type THourAndDate = {
  hour: string;
  date: string;
};

export function getWeekDayAndDate(
  date: number,
  timezoneOffset: number
): TWeekAndDate {
  const currentDate = new Date();
  const forecastDate = new Date(parseUnixDate(date, timezoneOffset));

  let weekDay = forecastDate.toLocaleString("bg-BG", { weekday: "long" });

  const isYesterday = currentDate.getDate() - 1 === forecastDate.getDate();
  const isToday = currentDate.getDate() === forecastDate.getDate();
  const isTommorow = currentDate.getDay() + 1 === forecastDate.getDay();

  if (isYesterday) {
    weekDay = "Вчера";
  }

  if (isToday) {
    weekDay = "Днес";
  }

  if (isTommorow) {
    weekDay = "Утре";
  }

  return {
    weekday: weekDay,
    date: forecastDate.toLocaleString("bg-BG", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
  };
}

export function getHoursAndDate(
  date: number,
  timezoneOffset: number
): THourAndDate {
  const forecastDate = new Date(parseUnixDate(date, timezoneOffset));
  return {
    hour: forecastDate.toLocaleString("bg-BG", {
      hour: "numeric",
      minute: "numeric",
    }),
    date: forecastDate.toLocaleString("bg-BG", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
  };
}

export function getSunriseAndSunsetHour(
  date: number,
  timezoneOffset: number
): string {
  const forecastDate = new Date(parseUnixDate(date, timezoneOffset));
  return forecastDate.toLocaleString("bg-BG", {
    hour: "numeric",
    minute: "numeric",
  });
}

function parseUnixDate(date: number, offset: number) {
  return (date + offset) * 1000;
}

import { useSelector } from "react-redux";
import { getCurrentForecastWithTZOffset } from "@/common/redux/forecastSlice";
import Image from "next/image";
import { openWeatherImageUrl } from "@/common/utils/openWeatherRequestBuilder";
import { getHoursAndDate } from "@/common/utils/dateUtils";
import { useExpandContent } from "@/common/hooks/useExpandContent";
import InformationIcon from "../../../public/icons/information";
import { getWeekDayAndDate } from "@/common/utils/dateUtils";
import WeatherTooltip from "./WeatherTooltip";

export default function CurrentWeatherScreen() {
  const dailyWeatherData = useSelector(getCurrentForecastWithTZOffset);

  return (
    <div className="flex flex-col sm:items-start sm:flex-row">
      <div className="w-full sm:w-fit sm:flex sm:self-stretch">
        <CurrentForecastCard
          currentWeather={dailyWeatherData.current}
          offset={dailyWeatherData.offset}
        />
      </div>
      <div className="flex flex-col  justify-start w-full sm:self-stretch sm:flex-row relative sm:overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-600">
        <SevenDaysForecastCard
          dailyForecast={dailyWeatherData.daily}
          offset={dailyWeatherData.offset}
        />
      </div>
    </div>
  );
}

function CurrentForecastCard({ currentWeather }: any) {
  return (
    <div className="sm:w-[330px]  bg-white">
      <h1 className="text-black text-center text-2xl font-medium sm:hidden">
        В момента
      </h1>
      <div className="flex flex-wrapflex-col justify-center items-center gap-1 px-5">
        <div className="flex flex-row items-center  justify-between ">
          <div className="relative w-[100px]  sm:w-48 aspect-square ">
            <Image
              priority
              src={openWeatherImageUrl(currentWeather.weather[0].icon)}
              fill
              alt="weather-icon"
            />
          </div>
          <div className="flex flex-row justify-end">
            <span className="text-orange-500 text-5xl break-normal">
              {Math.floor(currentWeather.temp)}{" "}
            </span>
            <span className="text-orange-500 text-2xl whitespace-normal">
              °C
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-xl font-medium   text-center w-2/4">
          {currentWeather.weather[0].description}{" "}
        </h1>
      </div>
      <div className="flex flex-row justify-center">
        <h2 className="text-lg">{"Усеща се като"}</h2> &nbsp;
        <div className="flex flex-row">
          <span className="text-lg">
            {Math.floor(currentWeather.feels_like)}
          </span>
          <span className="text-sm">°C</span>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-1 mt-5 sm:mt-8 sm:relative">
        <div className="flex flex-col items-center">
          <Image
            priority
            src={"/icons/drop.svg"}
            alt="drop"
            width={25}
            height={30}
          />
          <h1 className="text-sm text-[#92D3ED] font-bold text-center">
            {currentWeather.humidity}%
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <Image
            priority
            src={"/icons/wind.svg"}
            alt="wind"
            width={25}
            height={30}
          />
          <h1 className="text-sm text-[#92D3ED] text-center font-bold">
            {Math.ceil(currentWeather.wind_speed)} м/с
          </h1>
        </div>
        <div className="flex flex-col col-start-3 col-end-5 items-center">
          <Image
            priority
            src={"/icons/sunrise.svg"}
            alt="sunrise"
            width={25}
            height={30}
          />
          <h1 className="text-[13px]  sm:text-sm text-center text-[#c3c4c5]">
            Изгрев {getHoursAndDate(currentWeather.sunrise, 0).hour}
          </h1>
        </div>
        <div className="flex flex-col col-start-5 col-end-7 items-center">
          <Image
            priority
            src={"/icons/sunset.svg"}
            alt="sunset"
            width={25}
            height={30}
          />
          <h1 className="text-[13px] sm:text-sm text-center text-[#c3c4c5] ">
            Залез {getHoursAndDate(currentWeather.sunset, 0).hour}
          </h1>
        </div>
      </div>
    </div>
  );
}

function SevenDaysForecastCard({ dailyForecast, offset }: any) {
  const [activeTooltip, handleToolTipHover] = useExpandContent();

  return (
    <>
      {dailyForecast.map((weatherData: any, idx: any) => {
        const forecast = getWeekDayAndDate(weatherData.dt, offset);
        return (
          <div
            key={weatherData.dt}
            className="relative sm:border-r-2 border-t-2 sm:border-t-0 last:border-r-0 border-dashed sm:bg-[#34313B] bg-white"
          >
            <div className=" flex flex-wrap sm:min-w-[290px] sm:flex-col sm:bg-[#34313B] sm:border-t-0 items-center py-4 px-4 w-full bg-white justify-between">
              <div className="flex flex-col">
                <h1 className="text-sm min-[450px]:text-lg font-medium sm:text-center sm:text-white">
                  {forecast.weekday}
                </h1>
                <h1 className="text-sm min-[450px]:text-lg text-[#C8C9CA] sm:text-center">
                  {forecast.date}
                </h1>
              </div>
              <button
                className="hidden sm:flex  w-full mt-5 justify-center"
                aria-label="weather-data-popup"
                onPointerOver={(e) => handleToolTipHover(e, idx)}
                onPointerOut={(e) => handleToolTipHover(e, idx)}
              >
                <InformationIcon
                  priority
                  styles="w-10 h-9 fill-[#C8C9CA] stroke-white"
                />
              </button>
              <div
                className={`transition-[grid-template-rows]  hidden sm:absolute  hover:grid-rows-[1fr] top-[135px] w-full z-10 ease-in-out duration-500 sm:grid ${
                  !activeTooltip[idx] ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
                }`}
              >
                <WeatherTooltip weatherData={weatherData} />
              </div>
              <div className="flex  flex-row items-center gap-4 justify-end max-w-full sm:flex-col">
                <div className=" relative w-[35px] min-[450px]:w-24 aspect-square">
                  <Image
                    priority
                    src={openWeatherImageUrl(weatherData.weather[0].icon)}
                    fill
                    alt="weather-icon"
                    style={{ aspectRatio: 1 }}
                  />
                </div>
                <div className="hidden flex-row sm:flex sm:gap-1">
                  <span className="text-lg text-orange-500">
                    {Math.floor(weatherData.temp.max)}
                  </span>
                  <span className="text-sm text-orange-500">°</span>
                  <span>/</span>
                  <span className="text-lg text-blue-300">
                    {Math.floor(weatherData.temp.min)}
                  </span>
                  <span className="text-sm text-blue-300">°</span>
                </div>
                <span className="hidden sm:flex justify-center text-lg text-white font-bold ">
                  {weatherData.weather[0].description}
                </span>
                <div className="flex flex-row sm:hidden">
                  <span className="text-lg text-orange-500">
                    {Math.floor(weatherData.temp.max)}
                  </span>
                  <span className="text-sm text-orange-500">°</span>
                </div>
                <div className="flex flex-row sm:hidden">
                  <span className="text-lg text-blue-300">
                    {Math.floor(weatherData.temp.min)}
                  </span>
                  <span className="text-sm text-blue-300">°</span>
                </div>
                <button
                  className="sm:hidden"
                  aria-label="more-weather-data-button"
                  onPointerOver={(e) => handleToolTipHover(e, idx)}
                  onPointerOut={(e) => handleToolTipHover(e, idx)}
                >
                  <InformationIcon styles="w-10 h-9 fill-[#C8C9CA] stroke-white" />
                </button>
              </div>
            </div>
            <div
              className={`transition-[grid-template-rows] grid ease-in-out duration-500 sm:hidden ${
                !activeTooltip[idx] ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
              }`}
            >
              <WeatherTooltip weatherData={weatherData} />
            </div>
          </div>
        );
      })}
    </>
  );
}

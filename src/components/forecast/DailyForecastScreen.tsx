import { useSelector } from "react-redux";
import { getHourlyForecastWithTZOffset } from "@/common/redux/forecastSlice";
import { useExpandContent } from "@/common/hooks/useExpandContent";
import {
  getHoursAndDate,
  getPreviousDateToUnix,
} from "@/common/utils/dateUtils";
import { openWeatherImageUrl } from "@/common/utils/openWeatherRequestBuilder";
import WeatherTooltip from "./WeatherTooltip";
import InformationIcon from "../../../public/icons/information";
import Image from "next/image";
import { useRef, useState } from "react";
import AddNewMetricScreen from "../metrics/AddNewMetricsScreen";
import { useLazyGetForecastForPreviousDayQuery } from "@/common/api/weatherQueries";

export default function DailyForecastScreen() {
  const [activeTooltip, handleToolTipHover] = useExpandContent();
  const { location, hourly, offset } = useSelector(
    getHourlyForecastWithTZOffset
  );
  const [showMetricForm, setShowMetricForm] = useState(false);
  const prevBtnRef = useRef<any>(0);
  const lastFetchedDate = useRef<any>();
  const OPEN_WEATHER_HISTORY_LIMIT = 192;
  const [disablePrevButton, setDisablePrevButton] = useState(
    hourly.length >= OPEN_WEATHER_HISTORY_LIMIT
  );

  const [trigger, { isLoading, isSuccess }, lastPromiseInfo] =
    useLazyGetForecastForPreviousDayQuery();

  const toggleMetricForm = () => {
    setShowMetricForm(!showMetricForm);
  };

  const handlePrevForecastClick = () => {
    const dt = getPreviousDateToUnix(
      lastFetchedDate.current ?? hourly[0].dt + offset
    );
    trigger({ location, dt });
    if (isSuccess) {
      lastFetchedDate.current = dt;
      prevBtnRef.current = prevBtnRef.current + 1;
    }

    if (prevBtnRef.current >= 5) {
      setDisablePrevButton(true);
    }
  };

  return (
    <div className='flex relative flex-col'>
      <div className='flex relative flex-row bg-white'>
        <div className='hidden sm:flex flex-col w-full h-full min-w-[150px] max-w-[100px] border-r-2 border-dashed p-2 bg-white'>
          <div className='font-bold text-lg text-right'>Час</div>
          <div className='text-[#CACBCC] text-right'>Дата</div>
          <div className='h-full'>
            <ul className='text-right flex gap-[0.5rem] flex-col  pb-[3.85rem] h-full justify-end'>
              <li className='mb-9'>Скорост на вятъра</li>
              <li>Усеща се</li>
              <li>Облачност</li>
              <li>Атм. налягане</li>
              <li>Влажност</li>
            </ul>
          </div>
        </div>
        <div className='flex w-full sm:w-fit  flex-col  sm:flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-rounded-[100px] scrollbar-track-gray-100'>
          <button className='py-4 sm:hidden' onClick={toggleMetricForm}>
            {" "}
            + Добави нови измервания
          </button>
          <div
            className={`transition-[grid-template-rows] grid ease-in-out duration-500 sm:hidden ${
              !showMetricForm ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
            }`}
          >
            <div className='overflow-hidden relative'>
              <AddNewMetricScreen hideForm={toggleMetricForm} />
            </div>
          </div>
          {hourly.map((currWeather: any, index: any) => {
            return (
              <DailyForecastCard
                activeTooltip={activeTooltip[index]}
                key={currWeather.dt}
                onPointerOut={(e: any) => handleToolTipHover(e, index)}
                onPointerOver={(e: any) => handleToolTipHover(e, index)}
                elem={currWeather}
                offset={offset}
              />
            );
          })}
          <button
            className={`hidden sm:block absolute right-5  bottom-3 w-fit bg-orange-500 rounded-lg p-2 z-10  text-white`}
            onClick={toggleMetricForm}
          >
            {" "}
            + Добавяне на нови показатели
          </button>
          <div
            className={`transition-[max-height]   ease-in-out duration-500  ${
              !showMetricForm ? "max-h-[0px] " : "max-h-[100%]"
            }`}
          >
            <div
              className={`overflow-hidden  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-rounded-[100px] scrollbar-track-gray-100 flex flex-col absolute right-0 bottom-2 w-full sm:overflow-auto  z-10  shadow-lg sm:max-w-[21rem] bg-white transition-[max-height]   ease-in-out duration-500  ${
                !showMetricForm ? "max-h-[0px] " : "max-h-full"
              }`}
            >
              <AddNewMetricScreen hideForm={toggleMetricForm} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center relative  py-2 h-fit w-full bg-white'>
        <button
          onClick={handlePrevForecastClick}
          disabled={disablePrevButton || isLoading}
          className={`w-fit bg-orange-500 rounded-lg ${
            disablePrevButton ? "bg-gray-500" : ""
          } p-2 text-white`}
        >
          Прогноза за предишни дни
        </button>
      </div>
    </div>
  );
}

function DailyForecastCard({
  activeTooltip,
  onPointerOut,
  onPointerOver,
  elem,
  offset,
}: any) {
  const hourAndDate = getHoursAndDate(elem.dt, offset);
  return (
    <div className='first:border-r-2 border-r-2 border-t-2 sm:border-t-0  border-dashed'>
      <div className='flex flex-row gap-1 sm:pb-12 sm:flex-col items-center justify-between  p-2 bg-white'>
        <div className='flex flex-row w-full sm:flex-col items-center justify-between'>
          <div className='flex flex-col'>
            <div className='font-bold text-sm sm:text-lg sm:text-center'>
              {hourAndDate.hour}
            </div>
            <div className='text-[#CACBCC] text-sm sm:text-lg sm:text-center'>
              {hourAndDate.date}
            </div>
          </div>
          <div className='flex flex-row  items-center gap-1 sm:flex-col sm:my-[2rem]'>
            <div className='relative  w-[50px] min-[450px]:w-32 aspect-square'>
              <Image
                src={openWeatherImageUrl(elem.weather[0].icon)}
                fill
                alt='weather-icon'
              />
            </div>
            <div className='flex flex-row justify-center'>
              <span className='text-orange-500 text-xl sm:text-4xl break-normal'>
                {Math.floor(elem.temp)}{" "}
              </span>
              <span className='text-orange-500 text-xl sm:text-2xl whitespace-normal'>
                °C
              </span>
            </div>
            <button
              className='sm:hidden'
              onPointerOver={onPointerOver}
              onPointerOut={onPointerOut}
            >
              <InformationIcon styles='w-10 h-9 fill-[#C8C9CA] stroke-white' />
            </button>
          </div>
        </div>
        <div className='hidden sm:flex flex-col mt-[1rem] justify-center items-center'>
          <div className=' relative w-10 aspect-square'>
            <Image src={"/icons/windIcon.png"} fill alt='wind-icon' />
          </div>
          <span className='text-sm text-[#C4E6F5]'>
            {Math.ceil(elem.wind_speed)} м/с
          </span>
        </div>
        <div className='mt-[2rem] mb-[0.6rem]'>
          <ul className='hidden sm:flex flex-col gap-[0.6rem] text-center'>
            <li>{Math.floor(elem.feels_like)} C</li>
            <li>{elem.clouds}%</li>
            <li>{elem.pressure} hPa</li>
            <li>{elem.humidity}%</li>
          </ul>
        </div>
      </div>
      <div
        className={`transition-[grid-template-rows] grid ease-in-out duration-500 sm:hidden ${
          !activeTooltip ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <WeatherTooltip weatherData={elem} />
      </div>
    </div>
  );
}

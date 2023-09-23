import { getHoursAndDate } from "@/common/utils/dateUtils"
import { windDegreeToDirection } from "@/common/utils/degreeToDirection"
export default function WeatherTooltip({weatherData}:any){

  return (
    <div className='overflow-hidden gap-2  justify-center bg-slate-100  border-dashed sm:border-t-0 sm:bg-black sm:text-white sm:w-full'>
      <div className='flex flex-row gap-4  items-center w-full'>
        <h1 className='w-1/2 text-[13px] text-end'>Усеща се като:</h1>
        <h2 className='text-sm'>{Math.floor(weatherData.feels_like.day ?? weatherData.feels_like)}</h2>
      </div>
{typeof weatherData.sunrise === "number" &&
  (
    <>
      <div className='flex flex-row gap-4  items-center w-full'>
        <h1 className='w-1/2 text-[13px] text-end'>Изгрев:</h1>
        <h2 className='text-sm'>{getHoursAndDate(weatherData.sunrise, 0).hour}</h2>
      </div>
      <div className='flex flex-row gap-4  items-center w-full'>
        <h1 className='w-1/2 text-[13px] text-end'>Залез:</h1>
        <h2 className='text-sm'>{getHoursAndDate(weatherData.sunset, 0).hour}</h2>
      </div>  
    </>
  )}           
      <div className='flex flex-row gap-4 items-center'>
        <h1 className='w-1/2 text-[13px] text-end'>Скорост на вятъра:</h1>
        <div className='flex flex-row gap-1'>

        <h2 className='text-sm' >{Math.floor(weatherData.wind_speed)}</h2>
        <span className='text-sm' >м/с</span>
        </div>
      </div>
      <div className='flex flex-row gap-4 items-center'>
        <h1 className='w-1/2  text-[13px] text-end'>Посока на вятъра:</h1>
        <h2 className='text-sm' >{windDegreeToDirection(weatherData.wind_deg)}</h2>
      </div>
       <div className='flex flex-row gap-4 items-center'>
        <h1 className='w-1/2 text-[13px] text-end'>Атм. налягане:</h1>
        <h2 className='text-sm'>{weatherData.pressure} hPa</h2>
      </div> 
      <div className='flex flex-row gap-4 items-center'>
        <h1 className='w-1/2 text-[13px] text-end'>Влажност:</h1>
        <h2 className='text-sm'>{weatherData.humidity} %</h2>
      </div>
      <div className='flex flex-row gap-4 items-center'>
        <h1 className='w-1/2 text-[13px] text-end'>Облачност:</h1>
        <h2 className='text-sm'>{weatherData.clouds} %</h2>
      </div>                                      
    </div>
  )
}
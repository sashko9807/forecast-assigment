import {useSelector} from 'react-redux'
import { getHourlyForecastWithTZOffset } from '@/common/redux/forecastSlice'
import { useExpandContent } from '@/common/hooks/useExpandContent'
import { getHoursAndDate } from '@/common/utils/dateUtils'
import { openWeatherImageUrl } from '@/common/utils/openWeatherRequestBuilder'
import WeatherTooltip from './WeatherTooltip'
import InformationIcon from '../../../public/icons/information'
import Image from 'next/image'

export default function DailyForecastScreen() {
  const [activeTooltip, handleToolTipHover] = useExpandContent()
  const {hourly, offset}= useSelector(getHourlyForecastWithTZOffset)

  return (
    <div className='flex flex-row h-fit  bg-white'>
      <div className='hidden sm:flex flex-col w-full h-full min-w-[150px] border-r-2 border-dashed p-2 bg-white'>
      <div className='font-bold text-lg text-right'>Час</div>
      <div className='text-[#CACBCC] text-right'>Дата</div>
      <div className='flex flex-col mt-16 justify-center items-center'>    
      </div>
      <div className='h-full' >
        <ul className='text-right flex gap-[0.7rem] flex-col pb-4 h-full justify-end'>
          <li className='mb-9'>Скорост на вятъра</li>
          <li>Усеща се</li>
          <li>Облачност</li>
          <li>Атм. налягане</li>
          <li>Влажност</li>
        </ul>

      </div>
    </div>
    <div className='flex w-full sm:w-fit flex-col sm:flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-rounded-[100px] scrollbar-track-gray-100'>
      {hourly.map((currWeather:any, index:any) => {

        return(
      <DailyForecastCard 
      activeTooltip={activeTooltip[index]} 
      key={currWeather.dt}
      onPointerOut={(e:any)=> handleToolTipHover(e, index)} 
      onPointerOver={(e:any)=> handleToolTipHover(e, index)}
      elem={currWeather}
      offset={offset}
      />            
        )
      })}
    </div>
    </div>
  )
}


function DailyForecastCard({activeTooltip, onPointerOut, onPointerOver, elem, offset}:any){
  const hourAndDate = getHoursAndDate(elem.dt, offset)
  return (
    <>
    
    <div className='flex flex-row gap-1  border-t-2 first:border-t-0 sm:border-t-0 sm:flex-col items-center justify-between first:border-l-0 border-l-2 border-dashed p-2 bg-white'>
    <div className='flex flex-row w-full sm:flex-col items-center justify-between'>
       <div className='flex flex-col'>
      <div className='font-bold text-lg sm:text-center'>{hourAndDate.hour}</div>
      <div className='text-[#CACBCC] sm:text-center'>{hourAndDate.date}</div>
       </div>
       <div className='flex flex-row  items-center gap-1 sm:flex-col my-[2rem]'>
      <div className='relative  w-[50px] min-[450px]:w-32 aspect-square'>
      <Image src={openWeatherImageUrl(elem.weather[0].icon)} fill alt='weather-icon'/>
      </div>
      <div className='flex flex-row justify-center'>
      <span className='text-orange-500 text-xl sm:text-4xl break-normal'>{Math.floor(elem.temp)} </span>
      <span className='text-orange-500 text-xl sm:text-2xl whitespace-normal'>°C</span>
      </div>
          <button className='sm:hidden' onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
          <InformationIcon  styles="w-10 h-9 fill-[#C8C9CA] stroke-white"/> 
          </button>
       </div>
          </div>                      
      <div className='hidden sm:flex flex-col mt-[1rem] justify-center items-center'>
      <div className=' relative w-10 aspect-square'>
      <Image src={'/icons/windIcon.png'} fill alt='wind-icon'/>
      </div>
      <span className='text-sm text-[#C4E6F5]'>{Math.ceil(elem.wind_speed)} м/с</span>             
      </div>
      <div className='mt-[2rem] mb-[0.6rem]' >
        <ul className='hidden sm:flex flex-col gap-[0.6rem] text-center'>
          <li>{elem.feels_like} C</li>
          <li>{elem.clouds}%</li>
          <li>{elem.pressure} hPa</li>
          <li>{elem.humidity}%</li>
        </ul>
      </div>
    </div>
    <div className={`transition-[grid-template-rows] grid ease-in-out duration-500 sm:hidden ${!activeTooltip ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}>
      <WeatherTooltip weatherData={elem}/>
    </div>        
    </>
  )
}
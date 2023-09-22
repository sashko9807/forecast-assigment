import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useState} from 'react'
import InformationIcon from '../../public/icons/information'
import { getHoursAndDate, getWeekDayAndDate } from '@/common/utils/dateUtils'
import { windDegreeToDirection } from '@/common/utils/windDegreeToDirection'
import { useExpandContent } from '@/common/hooks/useExpandContent'


const inter = Inter({ subsets: ['latin'] })

const OPENWEATHER_IMAGE_URL = (image:string) =>  `https://openweathermap.org/img/wn/${image}@4x.png`


//Calculation formula (date + timezone_offset) * 1000
const WEATHER_MOCK_DATA = {
    "lat": 42.6977,
    "lon": 23.3219,
    "timezone": "Europe/Sofia",
    "timezone_offset": 10800,
    "current": {
        "dt": 1695155214,
        "sunrise": 1695096613,
        "sunset": 1695141078,
        "temp": 18.82,
        "feels_like": 18.53,
        "pressure": 1018,
        "humidity": 68,
        "dew_point": 12.79,
        "uvi": 0,
        "clouds": 75,
        "visibility": 10000,
        "wind_speed": 2.57,
        "wind_deg": 120,
        "weather": [
            {
                "id": 501,
                "main": "Rain",
                "description": "moderate rain",
                "icon": "10n"
            }
        ],
        "rain": {
            "1h": 1.15
        }
    },
    "hourly": [
        {
            "dt": 1695153600,
            "temp": 18.82,
            "feels_like": 18.53,
            "pressure": 1018,
            "humidity": 68,
            "dew_point": 12.79,
            "uvi": 0,
            "clouds": 75,
            "visibility": 10000,
            "wind_speed": 1.28,
            "wind_deg": 325,
            "wind_gust": 1.56,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.48
        },
        {
            "dt": 1695157200,
            "temp": 18.45,
            "feels_like": 18.2,
            "pressure": 1018,
            "humidity": 71,
            "dew_point": 13.1,
            "uvi": 0,
            "clouds": 80,
            "visibility": 10000,
            "wind_speed": 0.28,
            "wind_deg": 73,
            "wind_gust": 1.08,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "pop": 0.6,
            "rain": {
                "1h": 0.1
            }
        },
        {
            "dt": 1695160800,
            "temp": 18.06,
            "feels_like": 17.88,
            "pressure": 1018,
            "humidity": 75,
            "dew_point": 13.57,
            "uvi": 0,
            "clouds": 85,
            "visibility": 10000,
            "wind_speed": 1.04,
            "wind_deg": 146,
            "wind_gust": 1.35,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10n"
                }
            ],
            "pop": 0.76,
            "rain": {
                "1h": 1.15
            }
        },
        {
            "dt": 1695164400,
            "temp": 17.62,
            "feels_like": 17.5,
            "pressure": 1019,
            "humidity": 79,
            "dew_point": 13.94,
            "uvi": 0,
            "clouds": 90,
            "visibility": 10000,
            "wind_speed": 0.28,
            "wind_deg": 149,
            "wind_gust": 1.01,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.81
        },
        {
            "dt": 1695168000,
            "temp": 17.18,
            "feels_like": 17.09,
            "pressure": 1019,
            "humidity": 82,
            "dew_point": 14.08,
            "uvi": 0,
            "clouds": 95,
            "visibility": 10000,
            "wind_speed": 0.78,
            "wind_deg": 316,
            "wind_gust": 1.24,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.73
        },
        {
            "dt": 1695171600,
            "temp": 15.94,
            "feels_like": 15.89,
            "pressure": 1018,
            "humidity": 88,
            "dew_point": 12.97,
            "uvi": 0,
            "clouds": 45,
            "visibility": 10000,
            "wind_speed": 0.66,
            "wind_deg": 284,
            "wind_gust": 0.82,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.19
        },
        {
            "dt": 1695175200,
            "temp": 15.32,
            "feels_like": 15.23,
            "pressure": 1019,
            "humidity": 89,
            "dew_point": 12.6,
            "uvi": 0,
            "clouds": 24,
            "visibility": 10000,
            "wind_speed": 0.52,
            "wind_deg": 244,
            "wind_gust": 0.77,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "pop": 0.16
        },
        {
            "dt": 1695178800,
            "temp": 15.03,
            "feels_like": 14.91,
            "pressure": 1019,
            "humidity": 89,
            "dew_point": 12.41,
            "uvi": 0,
            "clouds": 21,
            "visibility": 10000,
            "wind_speed": 0.48,
            "wind_deg": 259,
            "wind_gust": 0.56,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "pop": 0.16
        },
        {
            "dt": 1695182400,
            "temp": 14.86,
            "feels_like": 14.75,
            "pressure": 1019,
            "humidity": 90,
            "dew_point": 12.28,
            "uvi": 0,
            "clouds": 38,
            "visibility": 10000,
            "wind_speed": 0.58,
            "wind_deg": 269,
            "wind_gust": 0.71,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.12
        },
        {
            "dt": 1695186000,
            "temp": 15.74,
            "feels_like": 15.64,
            "pressure": 1019,
            "humidity": 87,
            "dew_point": 12.74,
            "uvi": 0.13,
            "clouds": 50,
            "visibility": 10000,
            "wind_speed": 0.66,
            "wind_deg": 290,
            "wind_gust": 0.79,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0.04
        },
        {
            "dt": 1695189600,
            "temp": 17.65,
            "feels_like": 17.53,
            "pressure": 1019,
            "humidity": 79,
            "dew_point": 13.14,
            "uvi": 0.67,
            "clouds": 56,
            "visibility": 10000,
            "wind_speed": 0.86,
            "wind_deg": 283,
            "wind_gust": 1.2,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695193200,
            "temp": 19.93,
            "feels_like": 19.81,
            "pressure": 1019,
            "humidity": 70,
            "dew_point": 13.48,
            "uvi": 1.8,
            "clouds": 55,
            "visibility": 10000,
            "wind_speed": 1.18,
            "wind_deg": 276,
            "wind_gust": 1.6,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695196800,
            "temp": 22.08,
            "feels_like": 21.94,
            "pressure": 1019,
            "humidity": 61,
            "dew_point": 13.38,
            "uvi": 3.35,
            "clouds": 69,
            "visibility": 10000,
            "wind_speed": 1.43,
            "wind_deg": 289,
            "wind_gust": 1.95,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.13
        },
        {
            "dt": 1695200400,
            "temp": 24.26,
            "feels_like": 24.1,
            "pressure": 1018,
            "humidity": 52,
            "dew_point": 13.05,
            "uvi": 4.87,
            "clouds": 50,
            "visibility": 10000,
            "wind_speed": 1.53,
            "wind_deg": 298,
            "wind_gust": 2.18,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "pop": 0.21,
            "rain": {
                "1h": 0.14
            }
        },
        {
            "dt": 1695204000,
            "temp": 26.02,
            "feels_like": 26.02,
            "pressure": 1017,
            "humidity": 44,
            "dew_point": 12.18,
            "uvi": 5.89,
            "clouds": 51,
            "visibility": 10000,
            "wind_speed": 1.64,
            "wind_deg": 293,
            "wind_gust": 2.38,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.21
        },
        {
            "dt": 1695207600,
            "temp": 27.23,
            "feels_like": 26.93,
            "pressure": 1017,
            "humidity": 38,
            "dew_point": 10.94,
            "uvi": 5.85,
            "clouds": 43,
            "visibility": 10000,
            "wind_speed": 2,
            "wind_deg": 289,
            "wind_gust": 3.03,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0.23
        },
        {
            "dt": 1695211200,
            "temp": 27.96,
            "feels_like": 27.16,
            "pressure": 1016,
            "humidity": 32,
            "dew_point": 9.17,
            "uvi": 4.87,
            "clouds": 37,
            "visibility": 10000,
            "wind_speed": 1.68,
            "wind_deg": 299,
            "wind_gust": 3.77,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0.19
        },
        {
            "dt": 1695214800,
            "temp": 28.13,
            "feels_like": 27.19,
            "pressure": 1016,
            "humidity": 30,
            "dew_point": 8.32,
            "uvi": 3.03,
            "clouds": 22,
            "visibility": 10000,
            "wind_speed": 1.59,
            "wind_deg": 330,
            "wind_gust": 4,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "pop": 0.01
        },
        {
            "dt": 1695218400,
            "temp": 27.7,
            "feels_like": 26.88,
            "pressure": 1015,
            "humidity": 30,
            "dew_point": 7.93,
            "uvi": 1.6,
            "clouds": 36,
            "visibility": 10000,
            "wind_speed": 1.95,
            "wind_deg": 338,
            "wind_gust": 3.61,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0.11
        },
        {
            "dt": 1695222000,
            "temp": 26.79,
            "feels_like": 26.45,
            "pressure": 1015,
            "humidity": 34,
            "dew_point": 8.52,
            "uvi": 0.58,
            "clouds": 47,
            "visibility": 10000,
            "wind_speed": 1.94,
            "wind_deg": 0,
            "wind_gust": 3.29,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0.11
        },
        {
            "dt": 1695225600,
            "temp": 23.68,
            "feels_like": 23.3,
            "pressure": 1016,
            "humidity": 46,
            "dew_point": 10.5,
            "uvi": 0,
            "clouds": 44,
            "visibility": 10000,
            "wind_speed": 2.36,
            "wind_deg": 37,
            "wind_gust": 3.91,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "pop": 0.1
        },
        {
            "dt": 1695229200,
            "temp": 20.83,
            "feels_like": 20.51,
            "pressure": 1016,
            "humidity": 59,
            "dew_point": 11.66,
            "uvi": 0,
            "clouds": 41,
            "visibility": 10000,
            "wind_speed": 1.98,
            "wind_deg": 57,
            "wind_gust": 3.04,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.11
        },
        {
            "dt": 1695232800,
            "temp": 19.98,
            "feels_like": 19.68,
            "pressure": 1017,
            "humidity": 63,
            "dew_point": 11.82,
            "uvi": 0,
            "clouds": 38,
            "visibility": 10000,
            "wind_speed": 1.63,
            "wind_deg": 82,
            "wind_gust": 2.35,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0.08
        },
        {
            "dt": 1695236400,
            "temp": 19.45,
            "feels_like": 19.15,
            "pressure": 1018,
            "humidity": 65,
            "dew_point": 11.81,
            "uvi": 0,
            "clouds": 34,
            "visibility": 10000,
            "wind_speed": 1.24,
            "wind_deg": 67,
            "wind_gust": 1.73,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695240000,
            "temp": 19.08,
            "feels_like": 18.79,
            "pressure": 1018,
            "humidity": 67,
            "dew_point": 11.8,
            "uvi": 0,
            "clouds": 64,
            "visibility": 10000,
            "wind_speed": 1.33,
            "wind_deg": 86,
            "wind_gust": 1.85,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695243600,
            "temp": 18.46,
            "feels_like": 18.16,
            "pressure": 1018,
            "humidity": 69,
            "dew_point": 11.76,
            "uvi": 0,
            "clouds": 55,
            "visibility": 10000,
            "wind_speed": 1.41,
            "wind_deg": 98,
            "wind_gust": 1.95,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695247200,
            "temp": 18.02,
            "feels_like": 17.78,
            "pressure": 1019,
            "humidity": 73,
            "dew_point": 12.17,
            "uvi": 0,
            "clouds": 64,
            "visibility": 10000,
            "wind_speed": 0.96,
            "wind_deg": 274,
            "wind_gust": 1.47,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695250800,
            "temp": 18.36,
            "feels_like": 18.16,
            "pressure": 1018,
            "humidity": 73,
            "dew_point": 12.65,
            "uvi": 0,
            "clouds": 71,
            "visibility": 10000,
            "wind_speed": 1.4,
            "wind_deg": 128,
            "wind_gust": 2.1,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695254400,
            "temp": 18.14,
            "feels_like": 17.94,
            "pressure": 1018,
            "humidity": 74,
            "dew_point": 12.5,
            "uvi": 0,
            "clouds": 75,
            "visibility": 10000,
            "wind_speed": 0.18,
            "wind_deg": 165,
            "wind_gust": 0.92,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695258000,
            "temp": 18.25,
            "feels_like": 18.04,
            "pressure": 1018,
            "humidity": 73,
            "dew_point": 12.4,
            "uvi": 0,
            "clouds": 99,
            "visibility": 10000,
            "wind_speed": 0.4,
            "wind_deg": 291,
            "wind_gust": 0.91,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.02
        },
        {
            "dt": 1695261600,
            "temp": 18.42,
            "feels_like": 18.17,
            "pressure": 1017,
            "humidity": 71,
            "dew_point": 12.22,
            "uvi": 0,
            "clouds": 98,
            "visibility": 10000,
            "wind_speed": 1.19,
            "wind_deg": 108,
            "wind_gust": 1.47,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.02
        },
        {
            "dt": 1695265200,
            "temp": 18.41,
            "feels_like": 18.11,
            "pressure": 1017,
            "humidity": 69,
            "dew_point": 11.84,
            "uvi": 0,
            "clouds": 99,
            "visibility": 10000,
            "wind_speed": 0.43,
            "wind_deg": 156,
            "wind_gust": 0.8,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695268800,
            "temp": 18.12,
            "feels_like": 17.79,
            "pressure": 1017,
            "humidity": 69,
            "dew_point": 11.55,
            "uvi": 0,
            "clouds": 98,
            "visibility": 10000,
            "wind_speed": 0.32,
            "wind_deg": 73,
            "wind_gust": 0.93,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695272400,
            "temp": 18.37,
            "feels_like": 18.04,
            "pressure": 1017,
            "humidity": 68,
            "dew_point": 11.62,
            "uvi": 0.1,
            "clouds": 98,
            "visibility": 10000,
            "wind_speed": 0.56,
            "wind_deg": 171,
            "wind_gust": 0.72,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695276000,
            "temp": 19.81,
            "feels_like": 19.47,
            "pressure": 1017,
            "humidity": 62,
            "dew_point": 11.49,
            "uvi": 0.56,
            "clouds": 99,
            "visibility": 10000,
            "wind_speed": 0.71,
            "wind_deg": 145,
            "wind_gust": 1.16,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0
        },
        {
            "dt": 1695279600,
            "temp": 21.4,
            "feels_like": 21.06,
            "pressure": 1017,
            "humidity": 56,
            "dew_point": 11.36,
            "uvi": 1.1,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 0.76,
            "wind_deg": 134,
            "wind_gust": 1.33,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.02
        },
        {
            "dt": 1695283200,
            "temp": 22.82,
            "feels_like": 22.46,
            "pressure": 1017,
            "humidity": 50,
            "dew_point": 11.25,
            "uvi": 2.06,
            "clouds": 100,
            "visibility": 10000,
            "wind_speed": 0.77,
            "wind_deg": 127,
            "wind_gust": 1.49,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.11
        },
        {
            "dt": 1695286800,
            "temp": 25.24,
            "feels_like": 24.94,
            "pressure": 1016,
            "humidity": 43,
            "dew_point": 11.14,
            "uvi": 3.01,
            "clouds": 98,
            "visibility": 10000,
            "wind_speed": 0.22,
            "wind_deg": 128,
            "wind_gust": 1.38,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.15
        },
        {
            "dt": 1695290400,
            "temp": 26.25,
            "feels_like": 26.25,
            "pressure": 1016,
            "humidity": 40,
            "dew_point": 10.96,
            "uvi": 2.9,
            "clouds": 99,
            "visibility": 10000,
            "wind_speed": 1.25,
            "wind_deg": 313,
            "wind_gust": 1.89,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.15
        },
        {
            "dt": 1695294000,
            "temp": 26.43,
            "feels_like": 26.43,
            "pressure": 1015,
            "humidity": 39,
            "dew_point": 10.7,
            "uvi": 2.88,
            "clouds": 99,
            "visibility": 10000,
            "wind_speed": 1.45,
            "wind_deg": 313,
            "wind_gust": 1.8,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.15
        },
        {
            "dt": 1695297600,
            "temp": 26.57,
            "feels_like": 26.57,
            "pressure": 1015,
            "humidity": 38,
            "dew_point": 10.47,
            "uvi": 2.39,
            "clouds": 98,
            "visibility": 10000,
            "wind_speed": 1.25,
            "wind_deg": 341,
            "wind_gust": 1.38,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.15
        },
        {
            "dt": 1695301200,
            "temp": 26.61,
            "feels_like": 26.61,
            "pressure": 1014,
            "humidity": 39,
            "dew_point": 10.57,
            "uvi": 2.19,
            "clouds": 87,
            "visibility": 10000,
            "wind_speed": 0.98,
            "wind_deg": 319,
            "wind_gust": 1.54,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.34
        },
        {
            "dt": 1695304800,
            "temp": 25.1,
            "feels_like": 24.84,
            "pressure": 1014,
            "humidity": 45,
            "dew_point": 11.1,
            "uvi": 1.14,
            "clouds": 92,
            "visibility": 10000,
            "wind_speed": 0.83,
            "wind_deg": 159,
            "wind_gust": 1.72,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "pop": 0.35,
            "rain": {
                "1h": 0.16
            }
        },
        {
            "dt": 1695308400,
            "temp": 24.53,
            "feels_like": 24.32,
            "pressure": 1014,
            "humidity": 49,
            "dew_point": 11.86,
            "uvi": 0.41,
            "clouds": 95,
            "visibility": 10000,
            "wind_speed": 2.33,
            "wind_deg": 156,
            "wind_gust": 2.95,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.37
        },
        {
            "dt": 1695312000,
            "temp": 22.27,
            "feels_like": 22.09,
            "pressure": 1014,
            "humidity": 59,
            "dew_point": 12.79,
            "uvi": 0,
            "clouds": 96,
            "visibility": 10000,
            "wind_speed": 2.34,
            "wind_deg": 134,
            "wind_gust": 3.57,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "pop": 0.42
        },
        {
            "dt": 1695315600,
            "temp": 20.28,
            "feels_like": 20.09,
            "pressure": 1015,
            "humidity": 66,
            "dew_point": 12.85,
            "uvi": 0,
            "clouds": 97,
            "visibility": 10000,
            "wind_speed": 2.09,
            "wind_deg": 128,
            "wind_gust": 3.02,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04n"
                }
            ],
            "pop": 0.45
        },
        {
            "dt": 1695319200,
            "temp": 19.36,
            "feels_like": 19.23,
            "pressure": 1015,
            "humidity": 72,
            "dew_point": 13.23,
            "uvi": 0,
            "clouds": 97,
            "visibility": 10000,
            "wind_speed": 1.6,
            "wind_deg": 144,
            "wind_gust": 2.36,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "pop": 0.44,
            "rain": {
                "1h": 0.12
            }
        },
        {
            "dt": 1695322800,
            "temp": 18.89,
            "feels_like": 18.79,
            "pressure": 1016,
            "humidity": 75,
            "dew_point": 13.48,
            "uvi": 0,
            "clouds": 93,
            "visibility": 10000,
            "wind_speed": 1.04,
            "wind_deg": 148,
            "wind_gust": 1.98,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }
            ],
            "pop": 0.52,
            "rain": {
                "1h": 0.15
            }
        }
    ],
    "daily": [
        {
            "dt": 1695117600,
            "sunrise": 1695096613,
            "sunset": 1695141078,
            "moonrise": 1695112200,
            "moonset": 1695147660,
            "moon_phase": 0.13,
            "temp": {
                "day": 23.21,
                "min": 12.63,
                "max": 23.73,
                "night": 18.82,
                "eve": 20.35,
                "morn": 12.63
            },
            "feels_like": {
                "day": 22.81,
                "night": 18.53,
                "eve": 20.01,
                "morn": 12.17
            },
            "pressure": 1018,
            "humidity": 47,
            "dew_point": 10.4,
            "wind_speed": 2.02,
            "wind_deg": 105,
            "wind_gust": 3.2,
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 100,
            "pop": 0.48,
            "uvi": 3.92
        },
        {
            "dt": 1695204000,
            "sunrise": 1695183077,
            "sunset": 1695227369,
            "moonrise": 1695202740,
            "moonset": 1695235920,
            "moon_phase": 0.17,
            "temp": {
                "day": 26.02,
                "min": 14.86,
                "max": 28.13,
                "night": 19.08,
                "eve": 23.68,
                "morn": 14.86
            },
            "feels_like": {
                "day": 26.02,
                "night": 18.79,
                "eve": 23.3,
                "morn": 14.75
            },
            "pressure": 1017,
            "humidity": 44,
            "dew_point": 12.18,
            "wind_speed": 2.36,
            "wind_deg": 37,
            "wind_gust": 4,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 51,
            "pop": 0.81,
            "rain": 1.39,
            "uvi": 5.89
        },
        {
            "dt": 1695290400,
            "sunrise": 1695269541,
            "sunset": 1695313661,
            "moonrise": 1695293400,
            "moonset": 1695324600,
            "moon_phase": 0.2,
            "temp": {
                "day": 26.25,
                "min": 18.02,
                "max": 26.61,
                "night": 18.67,
                "eve": 22.27,
                "morn": 18.12
            },
            "feels_like": {
                "day": 26.25,
                "night": 18.68,
                "eve": 22.09,
                "morn": 17.79
            },
            "pressure": 1016,
            "humidity": 40,
            "dew_point": 10.96,
            "wind_speed": 2.34,
            "wind_deg": 134,
            "wind_gust": 3.57,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 99,
            "pop": 0.75,
            "rain": 1.03,
            "uvi": 3.01
        },
        {
            "dt": 1695376800,
            "sunrise": 1695356005,
            "sunset": 1695399953,
            "moonrise": 1695383940,
            "moonset": 1695414120,
            "moon_phase": 0.25,
            "temp": {
                "day": 27.04,
                "min": 15.83,
                "max": 29.56,
                "night": 21.11,
                "eve": 26.86,
                "morn": 15.83
            },
            "feels_like": {
                "day": 26.89,
                "night": 20.87,
                "eve": 26.72,
                "morn": 15.66
            },
            "pressure": 1015,
            "humidity": 40,
            "dew_point": 11.45,
            "wind_speed": 1.88,
            "wind_deg": 120,
            "wind_gust": 6.16,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 89,
            "pop": 0.89,
            "rain": 1.06,
            "uvi": 5.7
        },
        {
            "dt": 1695463200,
            "sunrise": 1695442470,
            "sunset": 1695486245,
            "moonrise": 1695474060,
            "moonset": 0,
            "moon_phase": 0.27,
            "temp": {
                "day": 28.38,
                "min": 17.26,
                "max": 31.86,
                "night": 24.23,
                "eve": 30.39,
                "morn": 17.26
            },
            "feels_like": {
                "day": 27.72,
                "night": 23.94,
                "eve": 29.05,
                "morn": 17
            },
            "pressure": 1016,
            "humidity": 36,
            "dew_point": 11.09,
            "wind_speed": 2.57,
            "wind_deg": 99,
            "wind_gust": 4.87,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 5,
            "pop": 0.2,
            "rain": 0.11,
            "uvi": 5.64
        },
        {
            "dt": 1695549600,
            "sunrise": 1695528934,
            "sunset": 1695572537,
            "moonrise": 1695563580,
            "moonset": 1695504300,
            "moon_phase": 0.31,
            "temp": {
                "day": 27.34,
                "min": 18.21,
                "max": 29.58,
                "night": 19.21,
                "eve": 25.67,
                "morn": 18.21
            },
            "feels_like": {
                "day": 27.01,
                "night": 19.2,
                "eve": 25.52,
                "morn": 17.86
            },
            "pressure": 1014,
            "humidity": 38,
            "dew_point": 11.05,
            "wind_speed": 4.74,
            "wind_deg": 103,
            "wind_gust": 7.48,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 97,
            "pop": 0.66,
            "rain": 0.89,
            "uvi": 4.72
        },
        {
            "dt": 1695636000,
            "sunrise": 1695615398,
            "sunset": 1695658829,
            "moonrise": 1695652500,
            "moonset": 1695595200,
            "moon_phase": 0.34,
            "temp": {
                "day": 24.58,
                "min": 16.05,
                "max": 26.39,
                "night": 21.14,
                "eve": 25.09,
                "morn": 16.05
            },
            "feels_like": {
                "day": 24.24,
                "night": 20.41,
                "eve": 24.54,
                "morn": 16.06
            },
            "pressure": 1020,
            "humidity": 44,
            "dew_point": 10.65,
            "wind_speed": 5.53,
            "wind_deg": 59,
            "wind_gust": 10.42,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 5,
            "pop": 0.35,
            "rain": 0.24,
            "uvi": 5
        },
        {
            "dt": 1695722400,
            "sunrise": 1695701863,
            "sunset": 1695745121,
            "moonrise": 1695740880,
            "moonset": 1695686400,
            "moon_phase": 0.38,
            "temp": {
                "day": 24.02,
                "min": 15.38,
                "max": 26.4,
                "night": 19.41,
                "eve": 24.63,
                "morn": 15.38
            },
            "feels_like": {
                "day": 23.26,
                "night": 18.45,
                "eve": 23.91,
                "morn": 14.38
            },
            "pressure": 1021,
            "humidity": 30,
            "dew_point": 4.91,
            "wind_speed": 6.29,
            "wind_deg": 63,
            "wind_gust": 7.91,
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04d"
                }
            ],
            "clouds": 79,
            "pop": 0,
            "uvi": 5
        }
    ]
}

const CITY_MOCK_DATA = [
  {
    city: "Sofia",
    country: "Bulgaria",
    lat: 42.69770,
    lon:  23.321867
  },
  {
    city: "London",
    country: "England",
    lat: 42.69770,
    lon:  23.321867
  },
  {
    city: "Berlin",
    country: "Germany",
    lat: 42.69770,
    lon:  23.321867
  }      
]


const FORECAST_OPTIONS = [
  {
    label: 'В момента',
    component: <CurrentWeatherScreen/>
  },
  {
    label: '24 часа',
    component: <DailyForecastScreen/>
  },                
]

export default function ForecastPanel() {
  const [selectedCity, setSelectedCity] = useState(CITY_MOCK_DATA[0])
  const [showDropDown, setShowDropDown] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(0);


  const showCityDropdownSelector = () => {
    setShowDropDown(!showDropDown)
  }

  const handleCitySelect = (value: any) => {
    setSelectedCity(value)
    setShowDropDown(false)
  }

  const handleMenuSelect = (index: any) =>{
    setSelectedMenu(index)
  }

  return (
    <div>
    <main className="w-full flex p-4">
      {/*Select city section*/}
      <div className='flex flex-col mt-10 w-full justify-center items-center '>
        <div className='w-full  max-w-[1200px]  flex flex-col  py-5 gap-2'>

      <div className='flex justify-between w-36 shadow-sm' onClick={showCityDropdownSelector} aria-label='select-city'>
      <h1 className='text-white'>Изберете град</h1>
      <Image className='items-center' src={'/icons/right-arrow.svg'} width={20} height={20} alt='select-city' />
      </div>
      {showDropDown && 
        <div className='w-60 p-5 rounded-lg bg-white' aria-label='city-dropdown'>
{      CITY_MOCK_DATA.map((value, index) => (
        <div className='text-black' key={index} aria-label={`${value.city}`} onClick={()=>handleCitySelect(value)}>{value.city}</div>
      ))}
        </div>
      }
      <h2 className='text-2xl text-white'>{selectedCity.city}</h2>
      <h2 className='text-2xl text-white'>{selectedCity.country}</h2>
        </div>
      {/*FORECAST*/}
      <div className='w-full  max-w-[1200px] flex flex-col border-2'>
           <div className={`flex flex-row  justify-center sm:justify-start  sm:border-none border-orange-500  gap-1`}>
           {FORECAST_OPTIONS.map((value, index) => (
            <div
            key={index} 
            className={
              `p-4 text-center
              sm:h-[45px] 
              self-end
              border-b-4
              w-full
              sm:w-fit
              ${selectedMenu === index && 'active !border-b-0  sm:!w-[330px] sm:h-[70px] hidden sm:block'} 
               bg-white
               border-orange-500
              [&.active]:border-t-4
              `}  
              onClick={()=>handleMenuSelect(index)}>{value.label}
              </div>           
           ))}
           </div>
      {FORECAST_OPTIONS[selectedMenu].component}
      </div>
      </div>
    </main>
    </div>
  )
}


function CurrentWeatherScreen() {
  return(
    <div className='flex flex-col sm:items-start sm:flex-row'>
      <div className='w-full sm:w-fit sm:flex sm:self-stretch'>
      <CurrentForecastCard/>
      </div>
      <div className='flex flex-col  justify-start w-full sm:flex-row relative sm:overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-600'>
      <SevenDaysForecastCard/>
      </div>
    </div>
  )
}


function CurrentForecastCard() {
  return (

    <div className='sm:w-[330px]  bg-white'>
      <h1 className='text-black text-center text-2xl font-medium sm:hidden'>В момента</h1>
      <div className='flex flex-wrapflex-col justify-center items-center gap-1 px-5'>
      <div className='flex flex-row items-center  justify-between '>
        <div className='relative w-[100px]  sm:w-48 aspect-square '>
        <Image priority src={OPENWEATHER_IMAGE_URL(WEATHER_MOCK_DATA.current.weather[0].icon)} fill alt='weather-icon' />
        </div>
      <div className='flex flex-row justify-end'>
      <span className='text-orange-500 text-5xl break-normal'>{Math.floor(WEATHER_MOCK_DATA.current.temp)} </span>
      <span className='text-orange-500 text-2xl whitespace-normal'>°C</span>
      </div>
      </div>
      </div>
      <div className='flex justify-center'>
        <h1 className='text-xl font-medium   text-center w-2/4'>{"Разкъсана облачност"} </h1>
      </div>
      <div className='flex flex-row justify-center'>
        <h2 className='text-lg'>{"Усеща се като"}</h2> &nbsp; 
        <div className='flex flex-row'>
        <span className='text-lg'>14</span>
        <span className='text-sm'>°C</span>
        </div>
      </div>
      <div className='grid grid-cols-6 gap-1 mt-5 sm:mt-8'>
        <div className='flex flex-col items-center'>
          <Image priority src={'/icons/drop.svg'} alt='drop' width={25} height={30}/>
          <h1 className='text-sm text-[#92D3ED] font-bold text-center'>68%</h1>
        </div>
         <div className='flex flex-col items-center'>
          <Image priority src={'/icons/wind.svg'} alt='wind' width={25} height={30}/>
          <h1 className='text-sm text-[#92D3ED] text-center font-bold'>7 м/с</h1>
        </div>
                <div className='flex flex-col col-start-3 col-end-5 items-center'>
          <Image priority src={'/icons/sunrise.svg'} alt='sunrise' width={25} height={30}/>
          <h1 className='text-[13px]  sm:text-sm text-center text-[#c3c4c5]'>Изгрев 06:59</h1>
        </div>
        <div className='flex flex-col col-start-5 col-end-7 items-center'>
          <Image priority src={'/icons/sunset.svg'} alt='sunset' width={25} height={30}/>
          <h1 className='text-[13px] sm:text-sm text-center text-[#c3c4c5] '>Залез 19:28</h1>
        </div>
      </div>
    </div>
  )
}

function SevenDaysForecastCard() {
  const [activeTooltip, handleToolTipHover] = useExpandContent()

  return (
<>
 {
  WEATHER_MOCK_DATA.daily.map((weatherData, idx) => {
    const forecast = getWeekDayAndDate(weatherData.dt, WEATHER_MOCK_DATA.timezone_offset)
    return (
      <div key={weatherData.dt} className='relative bg-white'>
      <div  className=' flex flex-wrap sm:min-w-[290px] sm:flex-col sm:bg-[#34313B] border-t-2 sm:border-r-2 sm:border-t-0 border-dashed items-center py-4 px-4 w-full bg-white justify-between'>
        <div className='flex flex-col'>
            <h1 className='text-sm min-[450px]:text-lg font-medium sm:text-center sm:text-white'>{forecast.weekday}</h1>
            <h1 className='text-sm min-[450px]:text-lg text-[#C8C9CA] sm:text-center'>{forecast.date}</h1>
        </div>
          <button className='hidden sm:flex  w-full mt-5 justify-center' aria-label='weather-data-popup'  onPointerOver={(e)=>handleToolTipHover(e, idx)} onPointerOut={(e)=> handleToolTipHover(e,idx)}>
          <InformationIcon  priority styles="w-10 h-9 fill-[#C8C9CA] stroke-white"/> 
          </button>        
        <div className={`transition-[grid-template-rows]  hidden sm:absolute  hover:grid-rows-[1fr] top-[135px] w-full z-10 ease-in-out duration-500 sm:grid ${!activeTooltip[idx] ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}>
          <WeatherTooltip weatherData={weatherData}/>
        </div>            
        <div className='flex  flex-row items-center gap-4 justify-end max-w-full sm:flex-col'>
          <div className=' relative w-[35px] min-[450px]:w-32 aspect-square'>
          <Image priority src={OPENWEATHER_IMAGE_URL(weatherData.weather[0].icon)} fill alt='weather-icon' style={{aspectRatio:1}}/>
          </div>
          <div className='hidden flex-row sm:flex sm:gap-1'>
          <span className='text-lg text-orange-500'>{Math.floor(weatherData.temp.max)}</span>
          <span className='text-sm text-orange-500'>°</span>
          <span>/</span>
          <span className='text-lg text-blue-300'>{Math.floor(weatherData.temp.min)}</span>
          <span className='text-sm text-blue-300'>°</span>
          </div> 
          <span className='hidden sm:flex justify-center text-lg text-white font-bold '>Дъжд</span>         
          <div className='flex flex-row sm:hidden'>
          <span className='text-lg text-orange-500'>{Math.floor(weatherData.temp.max)}</span>
          <span className='text-sm text-orange-500'>°</span>
          </div>      
          <div className='flex flex-row sm:hidden'>
          <span className='text-lg text-blue-300'>{Math.floor(weatherData.temp.min)}</span>
          <span className='text-sm text-blue-300'>°</span>
          </div>
          <button className='sm:hidden' aria-label='more-weather-data-button'  onPointerOver={(e) =>handleToolTipHover(e, idx)} onPointerOut={(e)=> handleToolTipHover(e, idx)}>
          <InformationIcon  styles="w-10 h-9 fill-[#C8C9CA] stroke-white"/> 
          </button>        
        </div>
      </div>    
        <div className={`transition-[grid-template-rows] grid ease-in-out duration-500 sm:hidden ${!activeTooltip[idx] ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}>
          <WeatherTooltip weatherData={weatherData}/>
        </div>          
      </div>
    )
  })  
 }
</>
    
  )
}


function WeatherTooltip({weatherData}:any){

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
        <h2 className='text-sm'>{getHoursAndDate(weatherData.sunrise, WEATHER_MOCK_DATA.timezone_offset).hour}</h2>
      </div>
      <div className='flex flex-row gap-4  items-center w-full'>
        <h1 className='w-1/2 text-[13px] text-end'>Залез:</h1>
        <h2 className='text-sm'>{getHoursAndDate(weatherData.sunset, WEATHER_MOCK_DATA.timezone_offset).hour}</h2>
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

function DailyForecastScreen() {
  const [activeTooltip, handleToolTipHover] = useExpandContent()

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
      {WEATHER_MOCK_DATA.hourly.map((currWeather, index) => {

        return(
      <DailyForecastCard 
      activeTooltip={activeTooltip[index]} 
      key={currWeather.dt}
      onPointerOut={(e:any)=> handleToolTipHover(e, index)} 
      onPointerOver={(e:any)=> handleToolTipHover(e, index)}
      elem={currWeather}
      />            
        )
      })}
    </div>
    </div>
  )
}


function DailyForecastCard({activeTooltip, onPointerOut, onPointerOver, elem}:any){
  const hourAndDate = getHoursAndDate(elem.dt, WEATHER_MOCK_DATA.timezone_offset)
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
      <Image src={OPENWEATHER_IMAGE_URL(elem.weather[0].icon)} fill alt='weather-icon'/>
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

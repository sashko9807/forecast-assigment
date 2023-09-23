import type { NextApiRequest, NextApiResponse } from 'next'
import {env} from '@/common/validation/envValidation'
import { openWeatherAddMeasurements } from '@/common/utils/openWeatherRequestBuilder'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const apiKey = env.OPEN_WEATHER_API_KEY
  const stationId = env.OPEN_WEATHER_STATION_ID
  const {body} = req 
    const response = await openWeatherAddMeasurements(apiKey, stationId, body)
    if(response?.code) { 
        res.status(401).json({message: response.message})
        return
    }

  res.status(201).json({status:201, message:"Success"})
}
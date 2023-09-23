import zod, {z} from 'zod'

export const metricsInputSchema = zod.object({
    username: zod.string().nonempty("Username field is required"),
    email: zod.string().nonempty("Email field is required").email("Not a valid email"),
    temperature: zod.number().min(-20, "Temp cant be below -20 celsius").max(60, 'Temp can\'t exceed 60 celsius'),
    wind_speed: zod.number().min(0, 'Wind speed can\'t be below  0 m/s').max(200, 'Wind speed can\'t exceed 200 m/s'),
    humidity: zod.number().min(0, 'Humidity level can\'t be below 0%').max(100, 'Humidity level can\'t exceed 100%'),
    pressure: zod.number().min(0, 'Pressure level can\'t be below 0 hPa').max(3000, 'Pressure level can\'t exceed 3000hPa'),
    rain: zod.number().min(0, 'Rain level can\'t be below 0mm').max(1000, 'Rain level can\'t exceed 1000mm')
})

export type TMetricInputSchema = z.infer<typeof metricsInputSchema>
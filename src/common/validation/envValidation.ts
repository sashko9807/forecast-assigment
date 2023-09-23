import zod from 'zod'

const envSchema = zod.object({
    GOOGLE_MAPS_API_KEY: zod.string().nonempty(),
    OPEN_WEATHER_API_KEY: zod.string().nonempty()
})

export const env = envSchema.parse(process.env)
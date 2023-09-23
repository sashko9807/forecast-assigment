import zod from 'zod'

const metricsInputSchema = zod.object({
    username: zod.string().nonempty(),
    email: zod.string().nonempty(),
    temperature: zod.number().min(-20).max(60),
    windSpeed: zod.number().min(0).max(200),
    pressure: zod.number().min(0).max(1000)
})

export const env = metricsInputSchema.parse(process.env)
import { z } from 'zod'

export const ReserveBookingSchema = z.object({
    event_id: z.number(),
    user_id: z.string()
})

export type ReserveBookingRequest = z.infer<typeof ReserveBookingSchema>

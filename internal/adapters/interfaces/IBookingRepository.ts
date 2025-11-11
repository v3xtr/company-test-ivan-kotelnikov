import { Booking } from "@prisma/client";

export interface IBookingRepository {
    create(data: { event_id: number; user_id: string }): Promise<Booking>;
    hasBooking(event_id: number, user_id: string): Promise<Booking | null>;
}

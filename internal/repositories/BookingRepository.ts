import { IBookingRepository } from "#internal/adapters/interfaces/IBookingRepository.js";
import { Booking, PrismaClient } from "@prisma/client";

export class BookingRepository implements IBookingRepository{
    constructor(private readonly prisma: PrismaClient){}

    async create(data: { event_id: number; user_id: string }): Promise<Booking> {
        return this.prisma.booking.create({ data });
    }

    async hasBooking(event_id: number, user_id: string): Promise<Booking | null> {
        return await this.prisma.booking.findFirst({
            where: {
                event_id,
                user_id
            }
        });
    
    }

}

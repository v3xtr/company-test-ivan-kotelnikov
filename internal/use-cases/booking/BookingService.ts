import { IBookingService } from "../../adapters/interfaces/IBookingService.js";
import { IBookingRepository } from '../../adapters/interfaces/IBookingRepository.js'
import { Booking } from "@prisma/client";
import { IEventsRepository } from "#internal/adapters/interfaces/IEventRepository.js";

export class BookingService implements IBookingService {
    constructor(
        private readonly bookingRepo: IBookingRepository,
        private readonly eventsRepo: IEventsRepository
    ) {}

    async book(event_id: number, user_id: string): Promise<Booking> {
        const eventExists = await this.eventsRepo.exists(event_id);
        
        if (!eventExists) {
            const error: any = new Error("Event not found");
            error.isBookingError = true;
            throw error;
        }

        const bookingExists = await this.bookingRepo.hasBooking(event_id, user_id);
        
        if (bookingExists) {
            const error: any = new Error("User already booked this event");
            error.isBookingError = true;
            throw error;
        }

        return this.bookingRepo.create({ event_id, user_id });
    }
}

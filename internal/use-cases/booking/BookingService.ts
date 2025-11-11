import { Booking } from "@prisma/client";
import { IEventsRepository } from "#internal/adapters/interfaces/IEventRepository.js";
import { IBookingService } from "#internal/adapters/interfaces/IBookingService.js";
import { IBookingRepository } from "#internal/adapters/interfaces/IBookingRepository.js";

export class BookingService implements IBookingService {
    constructor(
        private readonly bookingRepo: IBookingRepository,
        private readonly eventsRepo: IEventsRepository
    ) {}

    async book(event_id: number, user_id: string): Promise<Booking> {
        const eventExists = await this.eventsRepo.exists(event_id);
        
        if (!eventExists) {
            const error: any = new Error("Событие не найдено");
            error.isBookingError = true;
            throw error;
        }

        const bookingExists = await this.bookingRepo.hasBooking(event_id, user_id);
        
        if (bookingExists) {
            const error: any = new Error("Пользователь уже забронировал данное событие");
            error.isBookingError = true;
            throw error;
        }

        return this.bookingRepo.create({ event_id, user_id });
    }
}

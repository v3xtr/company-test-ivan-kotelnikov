import { router } from "#internal/adapters/router.js";
import { BookingHandler } from "../BookingHandler.js";
import { BookingService } from "#internal/use-cases/booking/BookingService.js";
import { BookingRepository } from "#internal/repositories/BookingRepository.js";
import { prisma } from "#internal/adapters/prisma.js";
import { EventsRepository } from "#internal/repositories/EventRepository.js";

const bookingRepo = new BookingRepository(prisma)
const eventRepo = new EventsRepository(prisma)
const bookingService = new BookingService(bookingRepo, eventRepo)
const bookingHandler = new BookingHandler(bookingService)

router.post("/bookings/reserve", bookingHandler.book.bind(bookingHandler))

export default router

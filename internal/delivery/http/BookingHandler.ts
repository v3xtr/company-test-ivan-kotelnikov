import { IBookingService } from "#internal/adapters/interfaces/IBookingService.js";
import { Request, Response } from "express";
import { ReserveBookingRequest, ReserveBookingSchema } from "#internal/validation/bookValidation.js";
import type { IBookingHandler } from "#internal/adapters/interfaces/IBookingController.js";

export class BookingHandler implements IBookingHandler {
  constructor(private readonly bookingService: IBookingService) {}

  async book(req: Request<{}, {}, ReserveBookingRequest>, res: Response) {
    try {
        const parsedResult = ReserveBookingSchema.safeParse(req.body);

        if (!parsedResult.success) {
            return res.status(400).json({ message: "Ошибка валидации", errors: parsedResult.error });
        }

        const { user_id, event_id } = parsedResult.data;

        const booking = await this.bookingService.book(Number(event_id), user_id);
        return res.status(201).json({ message: "Вы забронировали место", booking });
    } catch (error: any) {
      if (error.isBookingError) {
        return res.status(400).json({ message: error.message });
      }

      console.error(error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }
}

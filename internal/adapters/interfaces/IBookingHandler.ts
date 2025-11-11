import { ReserveBookingRequest } from "#internal/validation/bookValidation.js";
import { Request, Response } from "express";

export interface IBookingHandler{
    book(req: Request<{}, {}, ReserveBookingRequest>, res: Response): Promise<Response | any>
}

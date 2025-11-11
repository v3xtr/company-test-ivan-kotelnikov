import { IEventsRepository } from "#internal/adapters/interfaces/IEventRepository.js";
import { Event, PrismaClient } from "@prisma/client";

export class EventsRepository implements IEventsRepository{
    constructor(private readonly prisma: PrismaClient) {}

    async exists(event_id: number): Promise<Event | null> {
        return await this.prisma.event.findUnique({
            where: { id: event_id },
        });
    }
}

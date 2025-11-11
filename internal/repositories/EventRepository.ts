import { IEventsRepository } from "#internal/adapters/interfaces/IEventRepository.js";
import { PrismaClient } from "@prisma/client";

export class EventsRepository implements IEventsRepository{
    constructor(private readonly prisma: PrismaClient) {}

    async exists(event_id: number): Promise<boolean> {
        const event = await this.prisma.event.findUnique({
            where: { id: event_id },
        });
        return !!event;
    }
}

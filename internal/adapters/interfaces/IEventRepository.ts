import { Event } from "@prisma/client";

export interface IEventsRepository{
    exists(event_id: number): Promise<Event | null> 
}

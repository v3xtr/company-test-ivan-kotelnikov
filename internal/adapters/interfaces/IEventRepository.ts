export interface IEventsRepository{
    exists(event_id: number): Promise<boolean>
}

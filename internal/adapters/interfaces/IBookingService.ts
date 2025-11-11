export interface IBookingService{
    book(event_id: number, user_id: string): Promise<any>
}

import { Seat } from "./seat";

export interface SeatConfig{
    widthConfigured: number;
    heigthConfigured: number;
    seats: Seat[];
}
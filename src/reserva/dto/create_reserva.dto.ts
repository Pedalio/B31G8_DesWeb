import { IReserva } from "../interfaces/reserva.interface";

export class CreateReservaDTO implements IReserva {
    
    readonly precio: number;
    readonly nombre: string;
    readonly fechaReserva: String;

}

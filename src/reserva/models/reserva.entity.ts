import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservas')
export class ReservaEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    precio: number;

    @Column()
    nombre: string;
    
    @Column()
    fechaReserva: string;

}
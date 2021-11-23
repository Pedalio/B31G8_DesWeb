import { Injectable } from '@nestjs/common';

import { IReserva } from './interfaces/reserva.interface';
import { CreateReservaDTO } from './dto/create_reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservaEntity } from './models/reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {

    constructor(@InjectRepository(ReservaEntity) private readonly reservaRepository: Repository<IReserva>  ){}

    async getReservas(): Promise<IReserva[]> {
        const reservas = await this.reservaRepository.find();
        console.log(reservas);
        return Promise.resolve(reservas);

    }

    async getReservaByID(reservaId: string):Promise<IReserva>{
        const reserva = await this.reservaRepository.findOne(reservaId);
        console.log(reserva);
        return Promise.resolve(reserva);
    }

    async createReserva(createReservaDTO: CreateReservaDTO): Promise<IReserva>{
        const reserva = await this.reservaRepository.save(createReservaDTO);
        return Promise.resolve(reserva);

    }

    async updateReserva(reservaId: string, createReservaDTO: CreateReservaDTO):Promise<IReserva>{
        await this.reservaRepository.update(reservaId ,createReservaDTO );
        const updatedReserva = await this.reservaRepository.findOne(reservaId); 
        return Promise.resolve(updatedReserva);
    }

    async deleteReserva(reservaId: string):Promise<IReserva>{
        const deletedReserva = await this.reservaRepository.findOne(reservaId); 
        await this.reservaRepository.delete(reservaId);
        return Promise.resolve(deletedReserva);
    }



}

import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateReservaDTO } from './dto/create_reserva.dto';
import { ReservaService } from './reserva.service';

@Controller('reserva')
export class ReservaController {

    constructor(private readonly reservaService: ReservaService ){}

    @Get()
    async getReservas(@Req() req, @Res() res){
        const reservas = await this.reservaService.getReservas();
        
        return res.status(HttpStatus.OK).send(reservas);
        

    }

    @Get('/:reservaId')
    async getReserva(@Res() res , @Param('reservaId') id ){
        const reserva = await this.reservaService.getReservaByID(id);

        if(!reserva){
            throw new NotFoundException('Reserva no existe');
        }

        return res.status(HttpStatus.OK).send(reserva);

    }

    @Post("/create")
    async createReserva(@Res() res, @Body() createReservaDTO: CreateReservaDTO){

        const reserva = await this.reservaService.createReserva(createReservaDTO);

        return res.status(HttpStatus.CREATED).send(reserva);
    }

    @Put('/update/:reservaId')
    async updateReserva(  @Res() res, @Body() createReservaDTO: CreateReservaDTO, @Param('reservaId') id){
        const reserva = await this.reservaService.updateReserva(id, createReservaDTO);

        if(!reserva){
            throw new NotFoundException('Reserva no existe');
        }

        return res.status(HttpStatus.OK).send(reserva);
    }

    @Delete('/delete')
    async deleteReserva(@Res() res, @Query('reservaId') id){
        
        const reserva = await this.reservaService.deleteReserva(id);

        if(!reserva){
            throw new NotFoundException('Reserva no existe');
        }

        return res.status(HttpStatus.OK).send(reserva);
    }


}

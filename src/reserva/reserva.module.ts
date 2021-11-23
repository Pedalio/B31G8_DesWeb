import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ReservaEntity } from './models/reserva.entity';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forFeature([ReservaEntity])
  ],
  controllers: [ReservaController],
  providers: [ReservaService]
})
export class ReservaModule {}

import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "./user.enum";
import { ReservaEntity } from "src/reserva/models/reserva.entity";


@Entity('users')
export class UserEntity{


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false})
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({nullable: true, default : true})
    active: boolean;

    @Column({nullable: true, default : Role.AUTHUSER })
    role: Role;

    // 1:n relation with ProductEntity
    @OneToMany( type => ReservaEntity, reserva => reserva.nombre)
    reservas: ReservaEntity[];

    @BeforeInsert()
    async hashPassword(){
        this.password  = await bcrypt.hash(this.password, 10);
    }

}

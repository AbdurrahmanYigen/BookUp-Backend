import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm'
import { Status } from "../enums/status";
import {Invitee} from './Invitee'
@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    date:Date

    @CreateDateColumn()
    createdAt:string;
    
    @CreateDateColumn()
    updatedAt:string

    @DeleteDateColumn()
    deletedAt:string

    @Column()
    status: Status

    @ManyToOne(() => Invitee , invitee => invitee.bookings, {
        onDelete : "CASCADE"
    })
    invitees : Invitee
}
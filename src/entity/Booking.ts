import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { Status } from "../enums/status";
import { EventType } from './EventType';
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

    @OneToOne(() => Invitee )
    @JoinColumn()
    invitee : Invitee

    @ManyToOne(() => EventType, eventType => eventType.bookings, { onDelete: 'CASCADE' })
    eventType: EventType;
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { Status } from "../enums/status";
import { Offer } from './Offer';
import { Invitee } from './Invitee'
@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    date: Date

    @CreateDateColumn()
    createdAt: string;

    @CreateDateColumn()
    updatedAt: string

    @DeleteDateColumn()
    deletedAt: string

    @Column()
    status: Status

    @OneToOne(() => Invitee)
    @JoinColumn()
    invitee: Invitee

    @ManyToOne(() => Offer, offer => offer.bookings, { onDelete: 'CASCADE' })
    offer: Offer;
}
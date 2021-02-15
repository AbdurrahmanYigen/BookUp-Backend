import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "./Booking";
import { User } from './User';

@Entity()
export class EventType{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    duration: number;

    @Column()
    link: string;

    @ManyToOne(() => User, user => user.eventTypes, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Booking, booking => booking.eventType, { onDelete: 'CASCADE'})
    bookings: Booking[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updateAt: string;

    @DeleteDateColumn()
    deletedAt: string;
}
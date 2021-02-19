import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "./Booking";
import { User } from './User';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ length: '4096' })
    description: string;

    @Column()
    duration: number;

    @ManyToOne(() => User, user => user.offers, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Booking, booking => booking.offer, { onDelete: 'CASCADE' })
    bookings: Booking[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updateAt: string;

    @DeleteDateColumn()
    deletedAt: string;
}
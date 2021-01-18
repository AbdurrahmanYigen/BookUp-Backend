import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Unique, OneToMany } from 'typeorm'
import { Booking } from './Booking';


@Entity()
@Unique(["email"])
export class Invitee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @IsEmail({}, {message: "Incorrect email"})
    @IsNotEmpty({message: "The email is required"})
    email: string;

    @OneToMany(() => Booking, booking => booking.invitees, { onDelete: 'CASCADE' })
    bookings: Booking[];


    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @DeleteDateColumn()
    deletedAt: string;
}
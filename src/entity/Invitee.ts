import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'



@Entity()

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

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @DeleteDateColumn()
    deletedAt: string;
}
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Day } from "../enums/day";
import { User } from "./User";

@Entity()
export class DayAvailability{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne (() => User, user => user.availableTime, {onDelete: "CASCADE"})
    user: User;

    @Column({
        name: 'day',
        type: 'enum',
        enum: Day
    })
    day: Day;

    @Column()
    fromTimeHour: number;

    @Column()
    active: boolean;

    @Column()
    fromTimeMinute: number;

    @Column()
    endTimeHour: number;

    @Column()
    endTimeMinute: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updateAt: string;

    @DeleteDateColumn()
    deletedAt: string;
}
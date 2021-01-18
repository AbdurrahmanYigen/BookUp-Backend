import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Days } from "../enums/days";

@Entity()
export class AvailableTime{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: Days;

    @Column()
    fromTimeHour: number;

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
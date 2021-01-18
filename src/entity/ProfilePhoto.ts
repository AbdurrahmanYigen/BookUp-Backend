import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity()
export class ProfilePhoto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn()
    deletedAt: Timestamp;
}
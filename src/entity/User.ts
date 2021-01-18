import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, DeleteDateColumn, OneToOne } from 'typeorm'
import { AvailableTime } from './AvailableTime';
import { ProfilePhoto } from './ProfilePhoto';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    userName: string;

    @OneToOne(() => AvailableTime, {onDelete: "CASCADE"})
    availableTime : AvailableTime;

    @CreateDateColumn()
    emailVerifiedAt: Timestamp;

    @OneToOne(() => ProfilePhoto, {onDelete: "CASCADE"})
    imageId: ProfilePhoto

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn()
    deletedAt: Timestamp;
}
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm'
import { EventType } from './EventType';
import { AvailableTime } from './AvailableTime';
import { ProfilePhoto } from './ProfilePhoto';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToOne(() => AvailableTime, { onDelete: "CASCADE" })
    @JoinColumn()
    availableTime: AvailableTime;

    @CreateDateColumn()
    emailVerifiedAt: Timestamp;

    @OneToOne(() => ProfilePhoto, { onDelete: "CASCADE" })
    @JoinColumn()
    imageId: ProfilePhoto

    @OneToMany(() => EventType, eventType => eventType.user, {
        onDelete: "CASCADE"
    })
    eventTypes: EventType[]

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn()
    deletedAt: Timestamp;
}
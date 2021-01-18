import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany } from 'typeorm'
import { EventType } from './EventType';
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

    @CreateDateColumn()
    email_verified_at: Timestamp;

    @OneToOne(() => ProfilePhoto)
    imageId: ProfilePhoto

    @OneToMany(() => EventType , eventType => eventType.user, {
        onDelete : "CASCADE"
    })
    eventTypes : EventType[]

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp;

    @DeleteDateColumn()
    deleted_at: Timestamp;
}
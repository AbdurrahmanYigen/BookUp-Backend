import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn, DeleteDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm'
import { Offer } from './Offer';
import { DayAvailability } from './DayAvailability';
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

    @OneToMany(() => DayAvailability, dayAvailavbility => dayAvailavbility.user, {
        cascade: true,
        onDelete: "CASCADE"
    })
    availableTime: DayAvailability[];

    @CreateDateColumn()
    emailVerifiedAt: Timestamp;

    @OneToOne(() => ProfilePhoto, { onDelete: "CASCADE" })
    @JoinColumn()
    image: ProfilePhoto

    @OneToMany(() => Offer, offer => offer.user, {
        onDelete: "CASCADE"
    })
    offers: Offer[]

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;

    @DeleteDateColumn()
    deletedAt: Timestamp;
}
import { Request, Response } from "express";
import moment from "moment";
import { getRepository } from "typeorm";
import { Booking } from "../entity/Booking";
import { DayAvailability } from "../entity/DayAvailability";
import { EventType } from "../entity/EventType";
import { Invitee } from "../entity/Invitee";
// import { User } from "../entity/User";
//import { User } from "../entity/User";
// import { User } from "../entity/User";
import { createInviteeInternal } from "./invitee.controller";
// import { EventType } from "../entity/EventType";
// import { Invitee } from "../entity/Invitee";

export const getAllBookings = async (_: Request, res: Response) => {
    const bookingRepository = await getRepository(Booking);
    try {
        const bookings = await bookingRepository.find({ relations: ['invitee', 'eventType', 'eventType.user'] });

        res.send({
            data: bookings,
        });

    } catch (e) {
        console.error(e);
        res.status(400).send({
            status: "Internal Error!",
        });
    }
}


export const createBooking = async (req: Request, res: Response) => {
    const bookingRepository = await getRepository(Booking);
    const { date, status, invitee, eventType } = req.body;
    const inviteeRepository = getRepository(Invitee);
    const booking = new Booking();

    try {
        booking.date = date;
        booking.status = status;
        const newInvitee = createInviteeInternal(invitee.firstName, invitee.lastName, invitee.email);
        const createdInvitee = await inviteeRepository.save(newInvitee);
        booking.invitee = createdInvitee;
        booking.eventType = eventType;
        console.log(booking)
        const createdBooking = await bookingRepository.save(booking);
        res.send({
            data: createdBooking,
        });

    } catch (e) {
        console.error(e);
        res.status(400).send({
            message: 'Something went wrong. Could not create booking!',
        });
    };
}

export const deleteBookingById = async (req: Request, res: Response) => {
    const bookingRepository = await getRepository(Booking);
    const bookingId = req.params.bookingId;

    try {
        const booking = await bookingRepository.findOneOrFail(bookingId);
        await bookingRepository.remove(booking);
        res.send({
            message: `Booking with Id ${bookingId} was successfully deleted.`,
        });

    } catch (e) {
        console.error(e);
        res.status(400).send({
            status: "No Booking with such Id was found!",
        });
    }
}

export const patchBookingById = async (req: Request, res: Response) => {
    const bookingRepository = await getRepository(Booking);
    const bookingId = req.params.bookingId;

    let oldBooking = new Booking();

    try {
        oldBooking = await bookingRepository.findOneOrFail(bookingId);
        let newBooking = new Booking();
        newBooking = req.body;

        Object.assign(oldBooking, newBooking);
        await bookingRepository.save(oldBooking);

        //vielleicht überflüssig
        let correctDataOutput = new Booking();
        correctDataOutput = await bookingRepository.findOneOrFail(bookingId);
        console.log("patch Invitee was successfully.")

        res.send({
            data: correctDataOutput,
        });


    } catch (e) {
        console.error(e);
        res.status(400).send({
            status: "Internal Error",
        });
    }
}

export const getAllBookingsOfUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    // const userRepository = getRepository(User);
    const BookingRepo = getRepository(Booking)

    try {
        const BookedEVENT = await BookingRepo.createQueryBuilder("booking").leftJoinAndSelect("booking.invitee", "invitee")
            .leftJoinAndSelect("booking.eventType", "eventType")
            .where("eventType.user.id = :userid", { userid: userId })
            // .groupBy("booking.id")
            .getMany();

        res.send({
            data: BookedEVENT
        });
    } catch (error) {
        console.log("getAllBookingsOfUder: ", error);
        res.status(500).send({
            msg: 'server_error'
        })
    }
}

export const getAvailableTimeForDate = async (req: Request, res: Response) => {
    const offerId = req.params.offerId;
    const date: Date = new Date(req.query.date as string);

    console.log(date)
    // const bookingStartTime = req.body.bookingStartTime;
    const offerRepository = getRepository(EventType);
    try {
        const offer = await offerRepository.findOneOrFail({ relations: ['user', 'bookings', 'user.availableTime'], where: { id: offerId } });
        const dayOfBooking = offer.user.availableTime[date.getDay()];
        if (!dayOfBooking.active) {
            res.send({
                data: [],
            })
        }
        res.send({
            data: generateBookableTime(dayOfBooking, offer, date)
        })
    } catch (error) {
        console.log(error)
    }
}

const generateBookableTime = (dayAvailability: DayAvailability, offer: EventType, relevantDate: Date) => {
    const duration = offer.duration;

    const availableStartTime = moment().set({ hour: dayAvailability.fromTimeHour, minute: dayAvailability.fromTimeMinute, second: 0, millisecond: 0 });
    const availableEndTime = moment().set({ hour: dayAvailability.endTimeHour, minute: dayAvailability.endTimeMinute, second: 0, millisecond: 0 });

    let bookableTimeDavid: { hours: string, minutes: string, }[] = [];
    const tempStartTime = moment(availableStartTime);

    while (tempStartTime.isBefore(availableEndTime, "hour")) {
        bookableTimeDavid.push({ "hours": tempStartTime.format("HH"), "minutes": tempStartTime.format("mm") });
        tempStartTime.add(duration, "minutes");
    }

    for (const booking of offer.bookings) {
        if (booking.date.toDateString() == relevantDate.toDateString()) {
            let startTimeOfBooking = moment(booking.date);
            bookableTimeDavid = bookableTimeDavid.filter((item) => !(startTimeOfBooking.format("HH") === item.hours && startTimeOfBooking.format("mm") === item.minutes))
        }
    }

    return bookableTimeDavid;
}
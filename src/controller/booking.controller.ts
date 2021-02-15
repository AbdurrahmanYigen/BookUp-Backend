import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Booking } from "../entity/Booking";
import { Invitee } from "../entity/Invitee";
import { User } from "../entity/User";
import { createInviteeInternal } from "./invitee.controller";
// import { EventType } from "../entity/EventType";
// import { Invitee } from "../entity/Invitee";

export const getAllBookings = async(_: Request, res: Response) => {
    const bookingRepository = await getRepository(Booking);
    try {
        const bookings = await bookingRepository.find({relations: ['invitee', 'eventType', 'eventType.user']});

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


export const createBooking = async(req: Request, res: Response) => {
    const bookingRepository = await getRepository(Booking);
    const {date, status, invitee, eventType} = req.body;
    const inviteeRepository = getRepository(Invitee);
    const booking = new Booking();

    try {
        booking.date = date;
        booking.status = status;
        const newInvitee = createInviteeInternal(invitee.firstname, invitee.lastname, invitee.email);
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

export const deleteBookingById = async(req: Request, res: Response) => {
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

export const patchBookingById = async(req: Request, res: Response) => {
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
    const userRepository = getRepository(User);

    try {
        let bookings : Booking[] = [];
        const eventTypesOfUser = await (
            await userRepository.findOneOrFail({
                relations: ['eventTypes, eventTypes.bookings'],
                where: {id: userId}
            })
            ).eventTypes;

        for( let event of eventTypesOfUser){
            bookings.concat(event.bookings);
        }

        res.send({
            data: bookings
        });
    } catch (error) {
        console.log("getAllBookingsOfUder: ", error);
        res.status(500).send({
            msg: 'server_error'
        })
    }
}
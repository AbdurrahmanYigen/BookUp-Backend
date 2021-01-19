import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Booking } from "../entity/Booking";

export const getAllBookings = async(_: Request, res: Response) => {
    const bookingRepository = await getRepository(Booking);
    try {
        const bookings = await bookingRepository.find({relations: ['invitee', 'eventType']});
        //const bookings = await bookingRepository.find();

        res.send({
            data: bookings,
        });
        
    } catch (e) {
        console.log(e);
    }
}

export const createBooking = async(req: Request, res: Response) => {
    const bookingRepository = await getRepository(Booking);
    const {date, status, invitee, eventType} = req.body;
    const booking = new Booking();

    try {
        booking.date = date;
        booking.status = status;
        booking.invitee = invitee;
        booking.eventType = eventType;
        const createdBooking = await bookingRepository.save(booking);
        res.send({
            data: createdBooking,
        });

    } catch (e) {
        console.log(e);
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
        console.log(e);
        res.status(404).send({
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
        res.send({
            data: e,
        });
    }
}

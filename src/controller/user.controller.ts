import { Request, Response } from "express";
import { getRepository } from "typeorm";
//import { Booking } from "../entity/Booking";
import { EventType } from "../entity/EventType";
import { User } from "../entity/User";

export const createUser = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    try {
        const user = new User();
        Object.assign(user, req.body);
        // user.availableTime.getDefaultAvailableTime();
        const createdUser = await userRepository.save(user);
        res.send({
            data: createdUser,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'failed creating user!',
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userRepository = getRepository(User);
    try {
        const user = await userRepository.findOneOrFail({ where: { id: userId }, relations: ['imageId', 'availableTime', 'eventTypes'] });
        res.send({
            data: user,
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: `cant find User with id: ${userId}`
        })
    }
}

export const getAllUsers = async (_: Request, res: Response) => {
    const userRepository = getRepository(User);
    try {
        const users = await userRepository.find({ relations: ['imageId', 'availableTime', 'eventTypes'] })
        res.send({
            data: users,
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'cant get users'
        })
    }
}

export const patchUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { userName, password, availableTime, imageId, eventTypes } = req.body;
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOneOrFail({ where: { id: userId }, relations: ['imageId', 'availableTime', 'eventTypes'] });
        user.userName = userName;
        user.password = password;
        user.availableTime = availableTime;
        user.imageId = imageId;
        if ('eventTypes' in req.body) {
            user.eventTypes = user.eventTypes.concat(await createEventType(eventTypes));
        }
        const patchedUser = await userRepository.save(user);
        res.send({
            data: patchedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'user can not be patched'
        })
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userRepository = getRepository(User);
    try {
        const user = await userRepository.findOneOrFail({ where: { id: userId }, relations: ['imageId', 'availableTime', 'eventTypes'] });
        await userRepository.remove(user);
        res.send({
            status: 'user deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: 'cant delete user',
        })
    }
}

const createEventType = async (eventTypes: EventType[]) => {
    const eventTypeArr: EventType[] = [];


    try {
        eventTypes.forEach(async event => {
            const eventType = new EventType();
            //eventType.bookings = await createBooking(event.bookings);
            eventType.description = event.description;
            eventType.duration = event.duration;
            eventType.link = event.link;
            eventType.title = event.title;
            eventTypeArr.push(eventType);
        });
        const eventTypeRepository = getRepository(EventType);

        for (const eventType of eventTypeArr) {
            await eventTypeRepository.save(eventType);
        }
    } catch (error) {
        console.log(error);
    }
    return eventTypeArr;
}

// const createBooking = async (bookings: Booking[]) => {
//     const bookingArr: Booking[] = [];

//     bookings.forEach(booking => {
//         const tempBooking = new Booking();
//         tempBooking.date = booking.date;
//         //tempBooking.invitee = booking.invitee;
//         tempBooking.status = booking.status;
//         bookingArr.push(tempBooking);
//     });
//     const bookingRepository = getRepository(Booking);

//     try {
//         for (const booking of bookingArr) {
//             await bookingRepository.save(booking);
//         }
//     } catch (error) {
//         console.log(error);
//     }

//     return bookingArr;
// }
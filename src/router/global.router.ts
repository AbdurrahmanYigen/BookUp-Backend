import express, { Request, Response, Router } from "express";
import { dayAvailabilityRouter } from "./dayAvailability.router";
import { bookingRouter } from "./booking.router";
import { inviteeRouter } from "./invitee.router";
import { userRouter } from "./user.router";
import { eventTypeRouter } from "./eventType.router";

export const globalRouter = Router({ mergeParams: true });

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send({ message: 'Welcome to BookUp API' });
});

globalRouter.use('/user', userRouter);
globalRouter.use('/availability', dayAvailabilityRouter);
globalRouter.use('/invitee', inviteeRouter);
globalRouter.use('/booking', bookingRouter);
globalRouter.use('/eventType', eventTypeRouter);
globalRouter.use('/profilePhoto', express.static("uploads"));

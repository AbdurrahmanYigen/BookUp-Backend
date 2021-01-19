import { Request, Response, Router } from "express";
import { bookingRouter } from "./booking.router";
import { inviteeRouter } from "./invitee.router";
import { userRouter } from "./user.router";

export const globalRouter = Router({ mergeParams: true });

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send({ message: 'Welcome to BookUp API' });
});

globalRouter.use('/user', userRouter);

globalRouter.use('/invitee', inviteeRouter);

globalRouter.use('/booking', bookingRouter);
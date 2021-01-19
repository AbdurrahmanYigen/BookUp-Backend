import { Request, Response, Router } from "express";
import { availableTimeRouter } from "./availableTime.router";
import { userRouter } from "./user.router";

export const globalRouter = Router({ mergeParams: true });

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send({ message: 'Welcome to BookUp API' });
});

globalRouter.use('/user', userRouter);
globalRouter.use('/availability', availableTimeRouter);
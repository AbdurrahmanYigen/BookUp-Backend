import { Router } from "express";
import { createEvent, createUser, DeleteEvent, updateEvent } from "../controller/user.controller";

export const userRouter = Router({ mergeParams: true });

userRouter.post('/', createUser);

//Add Event to user
userRouter.post('/:userid/eventType', createEvent)

//Update Event
userRouter.patch('/:userid/eventType/:eventid', updateEvent)

//Delete Event
userRouter.delete('/:userid/eventType/:eventid', DeleteEvent)


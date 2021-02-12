import { Router } from "express";
import { createEvent, createUser, DeleteEvent, deleteUserById, getAllUsers, getEventFromUserId, getUserById, loginUser, patchUserById, registerUser, updateEvent } from "../controller/user.controller";

export const userRouter = Router({ mergeParams: true });

userRouter.post('/', createUser);

//Add Event to user
userRouter.post('/:userid/eventType', createEvent)

//Get Events from Userid
userRouter.get('/:userId/eventTypes', getEventFromUserId)

//Update Event
userRouter.patch('/:userid/eventType/:eventid', updateEvent)

//Delete Event
userRouter.delete('/:userid/eventType/:eventid', DeleteEvent)

//Get User by Id
userRouter.get('/:userId', getUserById);

//Get All Users
userRouter.get('/', getAllUsers);

//Patch User by Id
userRouter.patch('/:userId', patchUserById);

//Delete User by Id
userRouter.delete('/:userId', deleteUserById);

//Register User 
userRouter.post('/register', registerUser)

//Login User 
userRouter.post('/token', loginUser)
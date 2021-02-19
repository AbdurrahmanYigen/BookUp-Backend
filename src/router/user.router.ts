import { Router } from "express";
import { createEvent, DeleteEvent, deleteUserById, getAllUsers, getEventFromUserId, getUserById, loginUser, patchUserById, registerUser, updateEvent, uploadImage } from "../controller/user.controller";
import path from "path";
export const userRouter = Router({ mergeParams: true });


import multer from 'multer';
import { Authentication } from "../middleware/authentication";

var storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({ storage: storage });




//Add Event to user
userRouter.post('/:userid/eventType', Authentication.verifyAccess, createEvent);

//Get Events from Userid
userRouter.get('/:userId/eventTypes', Authentication.verifyAccess, getEventFromUserId);

//Update Event
userRouter.patch('/:userid/eventType/:eventid', Authentication.verifyAccess, updateEvent);

//Delete Event
userRouter.delete('/:userid/eventType/:eventid', Authentication.verifyAccess, DeleteEvent);

//Get User by Id
userRouter.get('/:userId', Authentication.verifyAccess, getUserById);

//Get All Users
userRouter.get('/', Authentication.verifyAccess, getAllUsers);

//Patch User by Id
userRouter.patch('/:userId', Authentication.verifyAccess, patchUserById);

//Patch User Image
userRouter.post('/:userId/image', Authentication.verifyAccess, upload.single('avatar'), uploadImage);

//Delete User by Id
userRouter.delete('/:userId', Authentication.verifyAccess, deleteUserById);

//Register User 
userRouter.post('/register', registerUser);

//Login User 
userRouter.post('/token', loginUser);
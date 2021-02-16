import { Router } from "express";
import { createEvent, DeleteEvent, deleteUserById, getAllUsers, getEventFromUserId, getUserById, loginUser, patchUserById, registerUser, updateEvent, uploadImage } from "../controller/user.controller";
import path from "path";
export const userRouter = Router({ mergeParams: true });


import multer from 'multer';

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
userRouter.post('/:userid/eventType', createEvent);

//Get Events from Userid
userRouter.get('/:userId/eventTypes', getEventFromUserId);

//Update Event
userRouter.patch('/:userid/eventType/:eventid', updateEvent);

//Delete Event
userRouter.delete('/:userid/eventType/:eventid', DeleteEvent);

//Get User by Id
userRouter.get('/:userId', getUserById);

//Get All Users
userRouter.get('/', getAllUsers);

//Patch User by Id
userRouter.patch('/:userId', patchUserById);

//Patch User Image
userRouter.post('/:userId/image', upload.single('avatar'), uploadImage);

//Delete User by Id
userRouter.delete('/:userId', deleteUserById);

//Register User 
userRouter.post('/register', registerUser);

//Login User 
userRouter.post('/token', loginUser);
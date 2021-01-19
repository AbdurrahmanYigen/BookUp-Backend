import { Router } from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, patchUser } from "../controller/user.controller";

export const userRouter = Router({ mergeParams: true });

userRouter.post('/', createUser);
userRouter.get('/:userId', getUserById);
userRouter.get('/', getAllUsers);
userRouter.patch('/:userId', patchUser);
userRouter.delete('/:userId', deleteUserById);


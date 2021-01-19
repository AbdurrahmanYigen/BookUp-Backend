import { Router } from "express";
import { createUser } from "../controller/user.controller";

export const userRouter = Router({ mergeParams: true });

userRouter.post('/', createUser);

import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const createUser = async (req: Request, res: Response) => {
    const { userName, email, password } = req.body;
    const userRepository = getRepository(User);
    try {
        const user = new User();
        user.userName = userName;
        user.email = email;
        user.password = password;
        const createdUser = await userRepository.save(user);
        res.send({
            data: createdUser,
        });
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: 'failed creating user!',
        })
    }
}

// export const getUserById = async (req: Request, res: Response) => {

// }

// export const getAllUsers = async (_: Request, res: Response) => {

// }

// export const patchUser = async (req: Request, res: Response) => {

// }

// export const deleteUserById = async (req: Request, res: Response) => {

// }
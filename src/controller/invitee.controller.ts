import {Request, Response } from "express";
import { getRepository } from "typeorm";
import { Invitee } from "../entity/Invitee";

export const getAllInvitees = async(_: Request, res: Response) => {
    const inviteeRepository = await getRepository(Invitee);
    try {
        const invitees = await inviteeRepository.find();

        res.send({
            data: invitees,
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({
            status: "Internal Error!",
        });
    }


};

export const createInviteeInternal = (firstname: string, lastname: string, email: string) : Invitee => {
    const invitee = new Invitee();
    invitee.firstName = firstname;
    invitee.lastName = lastname;
    invitee.email = email;
    return invitee;
}

export const createInvitee = async(req: Request, res: Response) => {
    const { firstname, lastname, email} = req.body;
    const inviteeRepository = await getRepository(Invitee);
    try {
        const invitee = createInviteeInternal(firstname, lastname, email);

        const createdInvitee = await inviteeRepository.save(invitee);
        res.send({
            data: createdInvitee,
        });

    } catch (e) {
        console.error(e);
        res.status(400).send({
            message: 'Something went wrong. Could not create invitee!',
        });
        
    };

}

export const deleteInviteeById = async(req: Request, res: Response) => {
    const inviteeRepository = await getRepository(Invitee);
    const inviteeId = req.params.inviteeId;

    try {
        const invitee = await inviteeRepository.findOneOrFail(inviteeId);
        await inviteeRepository.remove(invitee);
        res.send({
            message: `Invitee with Id ${inviteeId} was successfully deleted.`,
        });


    } catch (e) {
        console.error(e);
        res.status(400).send({
            status: "No Invitee with such Id was found!",
        });
    };
}


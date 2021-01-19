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
        console.log(e);
    }


};

export const createInvitee = async(req: Request, res: Response) => {
    const { firstname, lastname, email} = req.body;
    const inviteeRepository = await getRepository(Invitee);
    const invitee = new Invitee();
    try {
        invitee.firstName = firstname;
        invitee.lastName = lastname;
        invitee.email = email;

        const createdInvitee = await inviteeRepository.save(invitee);
        res.send({
            data: createdInvitee,
        });

    } catch (e) {
        res.status(404).send({
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
            message: `Invitee with id ${inviteeId} was successfully deleted.`,
        });


    } catch (e) {
        console.log(e);
        res.status(404).send({
            status: "No Invitee with such id was found!",
        });
    };
}

export const patchInviteeById = async(req: Request, res: Response) => {
    const inviteeRepository = await getRepository(Invitee);
    const inviteeId = req.params.inviteeId;

    let oldInvitee = new Invitee();

    try {
        oldInvitee = await inviteeRepository.findOneOrFail(inviteeId);
        let newInvitee = new Invitee();
        newInvitee = req.body;

        Object.assign(oldInvitee, newInvitee);
        await inviteeRepository.save(oldInvitee);

        //vielleicht überflüssig
        let correctDataOutput = new Invitee();
        correctDataOutput = await inviteeRepository.findOneOrFail(inviteeId);
        console.log("patch Invitee was successfully.")

        res.send({
            data: correctDataOutput,
        });


    } catch (e) {
        res.send({
            data: e,
        });
    }
}

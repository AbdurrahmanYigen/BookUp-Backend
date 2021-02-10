import { Router } from "express";
import { createInvitee, deleteInviteeById, getAllInvitees, patchInviteeById } from "../controller/invitee.controller";

export const inviteeRouter = Router({mergeParams: true});

//get all invitees
inviteeRouter.get('/', getAllInvitees);

//create invitee
inviteeRouter.post('/', createInvitee);

//delete invitee
inviteeRouter.delete('/:inviteeId', deleteInviteeById);

//update invitee
inviteeRouter.patch('/:inviteeId', patchInviteeById);
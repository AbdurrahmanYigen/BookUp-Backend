import { Router } from "express";
import { deleteAvailavbleTime, getAvailability, patchAvailableTime, createAvailableTime } from "../controller/availableTime.controller";


export const availableTimeRouter = Router({mergeParams: true})

availableTimeRouter.get('/', getAvailability);
availableTimeRouter.post('/', createAvailableTime);
availableTimeRouter.patch('/:userId', patchAvailableTime);
availableTimeRouter.delete('/:availableTimeId', deleteAvailavbleTime);
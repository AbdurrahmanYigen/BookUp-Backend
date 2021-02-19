import { Router } from "express";
import { getAvailabilityOfUser, patchDayAvailability } from "../controller/dayAvailability.controller";


export const dayAvailabilityRouter = Router({mergeParams: true})

dayAvailabilityRouter.get('/:userId', getAvailabilityOfUser);
dayAvailabilityRouter.patch('/update/:userId', patchDayAvailability);
import { Router } from "express";
import { getAvailabilityOfUser, getDayAvailability, patchDayAvailability } from "../controller/dayAvailability.controller";


export const dayAvailabilityRouter = Router({mergeParams: true})

dayAvailabilityRouter.get('/', getDayAvailability);
dayAvailabilityRouter.get('/:userId', getAvailabilityOfUser);
dayAvailabilityRouter.patch('/update/:userId', patchDayAvailability);
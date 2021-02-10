import { Router } from "express";
import { createDayAvailabitily, deleteDayAvailability, getAvailabilityOfUser, getDayAvailability, patchDayAvailability } from "../controller/dayAvailability.controller";


export const dayAvailabilityRouter = Router({mergeParams: true})

dayAvailabilityRouter.get('/', getDayAvailability);
dayAvailabilityRouter.post('/', createDayAvailabitily);
dayAvailabilityRouter.get('/:userId', getAvailabilityOfUser);
dayAvailabilityRouter.patch('/update/:userId', patchDayAvailability);
dayAvailabilityRouter.delete('/delete/:availableTimeId', deleteDayAvailability);
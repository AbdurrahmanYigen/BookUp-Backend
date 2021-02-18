import { Router } from "express";
import { getEventTypeById } from "../controller/eventType.controller";

export const eventTypeRouter = Router({ mergeParams: true });

eventTypeRouter.get('/:eventTypeId', getEventTypeById);

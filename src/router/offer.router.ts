import { Router } from "express";
import { getOfferById as getOfferById } from "../controller/offer.controller";

export const offerRouter = Router({ mergeParams: true });

offerRouter.get('/:offerId', getOfferById);

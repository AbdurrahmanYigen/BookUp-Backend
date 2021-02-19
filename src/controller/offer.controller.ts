import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Offer } from "../entity/Offer";

export const getOfferById = async (req: Request, res: Response) => {
    const offerRepository = getRepository(Offer);
    const offerId = req.params.offerId;
    try {
        const offer = await offerRepository.findOneOrFail({ where: { id: offerId } });
        res.send({
            data: offer,
        })
    }
    catch (e) {
        res.status(404).send({ status: 'not Found' });
    }
}
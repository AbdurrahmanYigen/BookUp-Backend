import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EventType } from "../entity/EventType";

export const getEventTypeById = async (req: Request, res: Response) => {
  const eventTypeRepository = getRepository(EventType);
  const eventTypeId = req.params.eventTypeId;
  try {
      const eventType = await eventTypeRepository.findOneOrFail({ where: { id: eventTypeId } });
      res.send({
          data: eventType,
      })
  }
  catch (e) {
      res.status(404).send({ status: 'not Found' });
  }
}
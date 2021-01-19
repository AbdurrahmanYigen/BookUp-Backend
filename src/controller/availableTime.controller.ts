import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AvailableTime } from "../entity/AvailableTime";
import { User } from "../entity/User";
//import { User } from "../entity/User";
import { Day, mapDayStringToDayEnum } from "../enums/day";

export const getAvailability = async (_: Request, res: Response) => {
    const availableTimeRepository = getRepository(AvailableTime);
    const availability = await availableTimeRepository.find();
    res.send({
        data: availability,
    });
};

export const getDefaultAvailableTimeForWeek = (): AvailableTime[] =>{
    let week : AvailableTime[] = [];
    for(let dayName in Day){
        if(isNaN(Number(dayName))){
            console.log("Day name: ", dayName);
            const weekDay = new AvailableTime();
            weekDay.day = mapDayStringToDayEnum(dayName);
            weekDay.fromTimeHour = 10;
            weekDay.endTimeHour = 18;
            weekDay.fromTimeMinute = 0;
            weekDay.endTimeMinute = 0;
            week.push(weekDay);
        }
    }
    return week;
}

export const createAvailableTime = async (req: Request, res: Response) => {
    const { day, fromTimeHour, endTimeHour, fromTimeMinute, endTimeMinute } = req.body;
    const availableTimeRepository = getRepository(AvailableTime);
    const availableTime = new AvailableTime();

    availableTime.day = day;
    availableTime.fromTimeHour = fromTimeHour;
    availableTime.endTimeHour = endTimeHour;
    availableTime.fromTimeMinute = fromTimeMinute;
    availableTime.endTimeMinute = endTimeMinute;
    try {
        const savedAvailableTime = await availableTimeRepository.save(availableTime);
        res.send({
            data: savedAvailableTime,
        })
    } catch (error) {
        console.log("availableTimeController: create:", error)
        res.status(500).send();
    }
    
}

export const deleteAvailavbleTime = async (req: Request, res: Response) => {
    const availableTimeId = req.params.availableTimeId;
    const availableTimeRepository = getRepository(AvailableTime);

    try {
        const availableTime = await availableTimeRepository.findOneOrFail(availableTimeId);
        await availableTimeRepository.remove(availableTime);
        res.send({
            message: "deleted_succesfully"
        })
    } catch (error) {
        console.log("availableTimeController: delete:", error);
        res.status(404).send({
            status: "not_found"
        });
    }
}
/*
export const patchAvailableTime = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const availableTime: AvailableTime = req.body;

    const userRepository = getRepository(User);

    try {
        const user = await userRepository.findOneOrFail(userId);
        user.availableTime = 
    } catch (error) {
        
    }
}
*/
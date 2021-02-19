import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { DayAvailability } from "../entity/DayAvailability";
import { User } from "../entity/User";
import { Day, mapDayStringToDayEnum } from "../enums/day";

export const getAvailabilityOfUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userRepository = getRepository(User);

    try {
        const user = await userRepository.findOneOrFail({ relations: ['availableTime'], where: { id: userId } });
        res.send({
            data: user.availableTime
        });
    } catch (error) {
        console.log("getAvailabilityOfUser: Failed to load user ", error);
        res.status(404).send({
            status: "not_found"
        });
    }

}

export const getDefaultWeek = (): DayAvailability[] => {
    const week: DayAvailability[] = [];
    for (let dayName in Day) {
        //if(isNaN(Number(dayName))){
        const weekDay = new DayAvailability();
        weekDay.day = mapDayStringToDayEnum(dayName);
        weekDay.fromTimeHour = 10;
        weekDay.endTimeHour = 18;
        weekDay.fromTimeMinute = 0;
        weekDay.endTimeMinute = 0;
        weekDay.active = true;
        week.push(weekDay);
        //}
    }
    // console.log("created following week:", week);
    return week;
}


export const patchDayAvailability = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const dayAvailability: DayAvailability = req.body;
    const userRepository = getRepository(User);

    try {
        const user = await userRepository.findOneOrFail({ relations: ['availableTime'], where: { id: userId } });
        console.log("patchDayAvailability vor update", user.availableTime);
        for (let i = 0; i < user.availableTime.length; i++) {
            if (user.availableTime[i].day == dayAvailability.day) {
                Object.assign(user.availableTime[i], dayAvailability);
                break;
            }
        }
        const updatedUser = await userRepository.save(user);
        console.log("patchDayAvailability nach update", updatedUser.availableTime);

        res.send({
            message: "updated succesfully"
        });
    } catch (error) {
        console.log("patchAvailability: ", error);
        res.status(500).send({
            message: error
        })
    }
}

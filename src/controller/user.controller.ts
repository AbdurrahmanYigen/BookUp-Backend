import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EventType } from "../entity/EventType";
import { User } from "../entity/User";

export const createUser = async (req: Request, res: Response) => {
    const { userName, email, password } = req.body;
    const userRepository = getRepository(User);
    try {
        const user = new User();
        user.userName = userName;
        user.email = email;
        user.password = password;
        const createdUser = await userRepository.save(user);
        res.send({
            data: createdUser,
        });
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: 'failed creating user!',
        })
    }
}

//Create Event to user
export const createEvent = async(req:Request,res:Response) => {
    let userid = req.params.id;
    let {title,description,duration,link} = req.body;
    const userRepository = getRepository(User);
    try{
        let foundUser = await userRepository.findOneOrFail(userid)
        let newEvent = new EventType()
        newEvent.title = title
        newEvent.description = description
        newEvent.duration = duration
        newEvent.link = link        
        newEvent.user = foundUser
        foundUser.eventTypes = [newEvent]
        await getRepository(EventType).save(newEvent)
        res.send("Successfully Added Event bedinhcao" )
    }
    catch(e){
        res.status(404).send({status:'not found'})
    }

}

//Update Event 
export const updateEvent = async (req:Request,res:Response) => {
    let eventid = req.params.eventid;
    let {title,description,duration,link} = req.body
    const eventRepository = getRepository(EventType)
    try {
        let foundEvent = await eventRepository.findOneOrFail(eventid)
        foundEvent.title = title
        foundEvent.duration =duration
        foundEvent.link = link
        foundEvent.description = description
        const updatedEvent = await eventRepository.save(foundEvent)
        res.send({
            data:updatedEvent
        })
    }
    catch(e){
        res.status(404).send({status : 'not Found'});
    }

}

//Delete Event
export const DeleteEvent = async(req:Request,res:Response) => {
    let eventid = req.params.eventid;
    const eventRepository = getRepository(EventType)
    try {
        let foundEvent = await eventRepository.findOneOrFail(eventid)
        await eventRepository.remove(foundEvent)
        res.send("Deleted Successfully")
    }
    catch(e){
    res.status(404).send({status : 'not Found'});
    }
}


export const getUserById = async (req: Request, res: Response) => {
    const eventRepository = getRepository(User);
    let userId = req.params.userId;
    try{
        let user = await eventRepository.findOneOrFail({relations: ['eventTypes'], where: {id : userId}});
        res.send({
            data: user
        })
    }
    catch(e) {
        res.status(404).send({status : 'not Found'});
    }
}


export const getAllUsers = async (_: Request, res: Response) => {
    const userRepository = getRepository(User);
    try {
        const users = await userRepository.find()
        res.send({
            data: users,
        });


    } catch (e) {
        res.status(400).send({
            status: "So empty nothing to see here!",
        });
    }
}

export const patchUserById = async (req: Request, res: Response) => {
    const userRepository = await getRepository(User);
    const userId = req.params.userId;
    const {email, userName} = req.body;

    try {
        let user = await userRepository.findOneOrFail(userId)
        if('userName' in req.body){
            user.userName = userName;
        }

        else if('email' in req.body){
            user.email = email
        }

        const updatedUser = await userRepository.save(user)

        console.log("patch User was successfully.");
        res.send({
            data: updatedUser,
        });

    } catch (e) {
        res.status(400).send({
            status: "Internal Error",
        });
    }

}

export const deleteUserById = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const userId = req.params.userId;

    try {
        const user = await userRepository.findOneOrFail(userId);
        await userRepository.remove(user);
        res.send({
            message: `User with Id ${userId} was successfully deleted.`,
        });

    } catch (e) {
        res.status(400).send({
            status: "No User with such Id was found!",
        })
    }


}
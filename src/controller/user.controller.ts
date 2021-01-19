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


// export const getUserById = async (req: Request, res: Response) => {

// }

// export const getAllUsers = async (_: Request, res: Response) => {

// }

// export const patchUser = async (req: Request, res: Response) => {

// }

// export const deleteUserById = async (req: Request, res: Response) => {

// }
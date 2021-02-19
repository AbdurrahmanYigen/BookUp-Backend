import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Offer } from "../entity/Offer";
import { ProfilePhoto } from "../entity/ProfilePhoto";
import { User } from "../entity/User";
import { Authentication } from "../middleware/authentication";
import { getDefaultWeek } from "./dayAvailability.controller";

//Create Offer to user
export const createOffer = async (req: Request, res: Response) => {
    let userid = req.params.userid;
    let { title, description, duration } = req.body;
    const userRepository = getRepository(User);
    try {
        let foundUser = await userRepository.findOneOrFail(userid)
        let newOffer = new Offer()
        newOffer.title = title
        newOffer.description = description
        newOffer.duration = duration
        newOffer.user = foundUser
        foundUser.offers = [newOffer]
        await getRepository(Offer).save(newOffer)
        res.send("Successfully added Offer to User")
    }
    catch (e) {
        res.status(404).send({ status: 'not found' })
    }
}

//Get Offer
export const getOfferFromUserId = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    let userId = req.params.userId;
    try {
        let user = await userRepository.findOneOrFail({ relations: ['offers'], where: { id: userId } });
        res.send({
            data: user.offers
        })
    }
    catch (e) {
        res.status(404).send({ status: 'not Found' });
    }
}

//Update Offer 
export const updateOffer = async (req: Request, res: Response) => {
    let offerId = req.params.offerId;
    let { title, description, duration } = req.body
    const offerRepository = getRepository(Offer)
    try {
        let foundOffer = await offerRepository.findOneOrFail(offerId)
        foundOffer.title = title
        foundOffer.duration = duration
        foundOffer.description = description
        const updatedOffer = await offerRepository.save(foundOffer)
        res.send({
            data: updatedOffer
        })
    }
    catch (e) {
        res.status(404).send({ status: 'not Found' });
    }

}

//Delete Offer
export const DeleteOffer = async (req: Request, res: Response) => {
    let offerId = req.params.offerId;
    const offerRepository = getRepository(Offer)
    try {
        let foundOffer = await offerRepository.findOneOrFail(offerId)
        await offerRepository.remove(foundOffer)
        res.send("Deleted Successfully")
    }
    catch (e) {
        res.status(404).send({ status: 'not Found' });
    }
}


export const getUserById = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    let userId = req.params.userId;
    try {
        let user = await userRepository.findOneOrFail({ relations: ['availableTime', 'offers', 'offers.bookings', 'image'], where: { id: userId } });
        res.send({
            data: user
        })
    }
    catch (e) {
        res.status(404).send({ status: 'not Found' });
    }
}


export const getAllUsers = async (_: Request, res: Response) => {
    const userRepository = getRepository(User);
    try {
        const users = await userRepository.find({ relations: ['availableTime', 'offers', 'offers.bookings'] });
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
    const { email, userName, password } = req.body;

    try {
        let user = await userRepository.findOneOrFail(userId)
        if ('userName' in req.body) {
            user.userName = userName;
        }
        if ('password' in req.body) {
            const hashedPassword: string = await Authentication.hashPassword(password)
            user.password = hashedPassword;
        }
        else if ('email' in req.body) {
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

export const uploadImage = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userRepository = getRepository(User);
    const imageRepository = getRepository(ProfilePhoto);
    const tempImage = new ProfilePhoto();
    try {
        const user = await userRepository.findOneOrFail(userId);
        tempImage.url = req.file.filename;
        const uploadedImage = await imageRepository.save(tempImage);
        user.image = uploadedImage;
        await userRepository.save(user);
        res.send({
            data: tempImage,
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            status: "user not found"
        })
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

export const registerUser = async (req: Request, res: any) => {
    let { email, userName, password } = req.body;

    const userRepository = await getRepository(User);

    //check if user exists
    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })
    if (user) {
        return res.status(400).send({
            status: 'bad_request'
        })
    }

    //Generate hashed password
    const hashedPassword: string = await Authentication.hashPassword(password);

    let newUser = new User();
    newUser.email = email;
    newUser.userName = userName;
    newUser.password = hashedPassword;
    newUser.availableTime = getDefaultWeek();

    const createdUser = await userRepository.save(newUser);

    res.send({
        data: createdUser
    })

}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userRepository = await getRepository(User);
    // Check if user exists
    //check if user exists
    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })
    if (!user) {
        return res.status(401).send({ status: 'unauthorized' });
    }

    const matchingPasswords: boolean = await Authentication.comparePasswordWithHash(password, user.password);
    if (!matchingPasswords) {
        return res.status(401).send({ status: 'unauthorized' });
    }

    const token: string = await Authentication.generateToken({
        email: user.email,
        id: user.id,
        name: user.userName,
    });

    return res.send({
        data: token,
    });
};
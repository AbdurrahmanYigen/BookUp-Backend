import { Router } from "express";
import { createBooking, deleteBookingById, getAllBookings, getAllBookingsOfUser, getAvailableTimeForDate} from "../controller/booking.controller";
import { Authentication } from "../middleware/authentication";


export const bookingRouter = Router({ mergeParams: true });

//get all bookings
bookingRouter.get('/', getAllBookings);

//create booking
bookingRouter.post('/', createBooking);

//delete Booking by id
bookingRouter.delete('/:bookingId', Authentication.verifyAccess, deleteBookingById);

// get Bookings of a userID
bookingRouter.get('/all/:userId', Authentication.verifyAccess, getAllBookingsOfUser);

//get available time for day
bookingRouter.get('/:offerId' , getAvailableTimeForDate)
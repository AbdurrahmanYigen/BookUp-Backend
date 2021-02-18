import { Router } from "express";
import { createBooking, deleteBookingById, getAllBookings, getAllBookingsOfUser, getAvailableTimeForDate, patchBookingById } from "../controller/booking.controller";


export const bookingRouter = Router({ mergeParams: true });

//get all bookings
bookingRouter.get('/', getAllBookings);

//create invitee
bookingRouter.post('/', createBooking);

//delete invitee
bookingRouter.delete('/:bookingId', deleteBookingById);

//update invitee
bookingRouter.patch('/:inviteeId', patchBookingById);

bookingRouter.get('/all/:userId', getAllBookingsOfUser);

//get available time for day
bookingRouter.get('/:offerId', getAvailableTimeForDate)
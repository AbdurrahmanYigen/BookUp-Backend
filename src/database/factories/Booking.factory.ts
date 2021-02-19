import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Booking } from '../../entity/Booking';
import { Invitee } from '../../entity/Invitee';
import { Offer } from '../../entity/Offer';
import { Status } from '../../enums/status';


define(Booking, (faker: typeof Faker) => {
    const booking = new Booking();
    booking.date = faker.date.recent(-1);
    booking.status = Status['InProcess'];
    booking.invitee = factory(Invitee)() as any;
    booking.offer = factory(Offer)() as any;

    return booking;
});

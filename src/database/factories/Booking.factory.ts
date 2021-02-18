import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Booking } from '../../entity/Booking';
import { Invitee } from '../../entity/Invitee';
import { EventType } from '../../entity/EventType';
import { Status } from '../../enums/status';


define(Booking, (faker: typeof Faker) => {
    const booking = new Booking();
    booking.date = faker.date.recent(-1);
    booking.status = Status['InProcess'];
    booking.invitee = factory(Invitee)() as any;
    booking.eventType = factory(EventType)() as any;

    return booking;
});

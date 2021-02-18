import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { DayAvailability } from '../../entity/DayAvailability';
import { User } from '../../entity/User';
import { Day } from '../../enums/day';


define(DayAvailability, (faker: typeof Faker) => {
    const dayAvailabilityString = 'MONDAY';

    const dayAvailability = new DayAvailability();
    dayAvailability.day = Day[dayAvailabilityString];
    dayAvailability.fromTimeHour = faker.random.number();
    dayAvailability.fromTimeMinute = faker.random.number();
    dayAvailability.endTimeHour = faker.random.number();
    dayAvailability.endTimeMinute = faker.random.number();
    dayAvailability.active = faker.random.boolean();
    dayAvailability.user = factory(User)() as any;

    return dayAvailability;
});

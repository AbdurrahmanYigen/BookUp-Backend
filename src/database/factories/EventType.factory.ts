import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { User } from "../../entity/User";
import { EventType } from '../../entity/EventType';


define(EventType, (faker: typeof Faker) => {
    const eventType = new EventType();
    eventType.title = faker.name.title();
    eventType.description = faker.lorem.paragraph();
    eventType.duration = faker.random.arrayElement([15, 30, 45, 60]);
    eventType.link = faker.internet.userName();
    eventType.user = factory(User)() as any;

    return eventType;
});

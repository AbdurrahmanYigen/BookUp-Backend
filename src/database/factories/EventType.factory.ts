import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { User } from "../../entity/User";
import { Offer } from '../../entity/Offer';


define(Offer, (faker: typeof Faker) => {
    const offer = new Offer();
    offer.title = faker.name.title();
    offer.description = faker.lorem.paragraph();
    offer.duration = faker.random.arrayElement([15, 30, 45, 60]);
    offer.user = factory(User)() as any;

    return offer;
});

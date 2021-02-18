import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { User } from "../../entity/User";
import { getDefaultWeek } from "../../controller/dayAvailability.controller";
import { ProfilePhoto } from '../../entity/ProfilePhoto';


define(User, (faker: typeof Faker) => {
    const user = new User()
    user.userName = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = 'hash';
    user.availableTime = getDefaultWeek();
    user.imageId = factory(ProfilePhoto)() as any;

    return user;
});

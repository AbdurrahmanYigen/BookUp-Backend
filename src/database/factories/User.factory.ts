import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from "../../entity/User";
import { getDefaultWeek } from "../../controller/dayAvailability.controller";


define(User, (faker: typeof Faker) => {  
    const hashedPassword: string = 'hash';
    const email = faker.internet.email();

    const user = new User()
    user.userName = faker.internet.userName();
    user.password = hashedPassword;
    user.email = email;
    user.availableTime = getDefaultWeek();

    return user;
});

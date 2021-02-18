import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Invitee } from "../../entity/Invitee";

define(Invitee, (faker: typeof Faker) => {
    const invitee = new Invitee();

    invitee.firstName = faker.name.firstName();
    invitee.lastName = faker.name.lastName();
    invitee.email = faker.internet.email();

    return invitee;
});


// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Booking } from '../../entity/Booking';
import { Offer } from '../../entity/Offer';
import { Invitee } from '../../entity/Invitee';
import { User } from '../../entity/User';
import { Authentication } from '../../middleware/authentication';
import faker from 'faker';
import { Status } from '../../enums/status';

export default class CreateDefaultUser implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const password = await Authentication.hashPassword('test');

    const user = await factory(User)().create({ email: 'test@gmail.com', password });

    const offer = await factory(Offer)().create({ user });
    await factory(Offer)().create({ user });
    await factory(Offer)().create({ user });

    // Future bookings
    await factory(Booking)().create({ offer: offer, invitee: await factory(Invitee)().create() });
    await factory(Booking)().create({ offer: offer, invitee: await factory(Invitee)().create() });

    // Past booking
    await factory(Booking)().create({ offer: offer, invitee: await factory(Invitee)().create(), date: faker.date.recent(1), status: Status['Done'] });
  }
}

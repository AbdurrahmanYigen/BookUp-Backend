  
// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Booking } from '../../entity/Booking';
import { EventType } from '../../entity/EventType';
import { Invitee } from '../../entity/Invitee';
import { User } from '../../entity/User';
import { Authentication } from '../../middleware/authentication';
import faker from 'faker';
import { Status } from '../../enums/status';

export default class CreateDefaultUser implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const password = await Authentication.hashPassword('test');

    const user = await factory(User)().create({ email: 'test@gmail.com', password });

    const eventType = await factory(EventType)().create({ user });
    await factory(EventType)().create({ user });
    await factory(EventType)().create({ user });

    // Future bookings
    await factory(Booking)().create({ eventType, invitee: await factory(Invitee)().create() });
    await factory(Booking)().create({ eventType, invitee: await factory(Invitee)().create() });

    // Past booking
    await factory(Booking)().create({ eventType, invitee: await factory(Invitee)().create(), date: faker.date.recent(1), status: Status['Done'] });
  }
}

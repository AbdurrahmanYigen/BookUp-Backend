  
// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Booking } from '../../entity/Booking';

export default class CreateBooking implements Seeder {
  public async run(factory: Factory): Promise<any> {

    await factory(Booking)().createMany(10);
  }
}

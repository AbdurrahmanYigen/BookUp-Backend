
// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Offer } from '../../entity/Offer';

export default class CreateOffer implements Seeder {
  public async run(factory: Factory): Promise<any> {

    await factory(Offer)().createMany(10);
  }
}

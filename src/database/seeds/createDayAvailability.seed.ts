  
// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { DayAvailability } from '../../entity/DayAvailability';

export default class CreateDayAvailability implements Seeder {
  public async run(factory: Factory): Promise<any> {

    await factory(DayAvailability)().createMany(10);
  }
}

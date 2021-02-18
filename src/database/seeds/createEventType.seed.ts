  
// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { EventType } from '../../entity/EventType';

export default class CreateEventType implements Seeder {
  public async run(factory: Factory): Promise<any> {

    await factory(EventType)().createMany(10);
  }
}

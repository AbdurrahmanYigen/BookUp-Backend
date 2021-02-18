  
// import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { User } from '../../entity/User';
import { Authentication } from '../../middleware/authentication';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const password = await Authentication.hashPassword('test');

    await factory(User)().create({ email: 'test@gmail.com', password });
    await factory(User)().createMany(10, { password });
  }
}
